require('dotenv').config();
const express = require('express');
const { request, gql } = require('graphql-request');

const app = express();
const port = 3000;

const endpoint = 'https://api.github.com/graphql';
const headers = {
  Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
};

const fetchLatestCommitInfo = async (orgName) => {
  const query = gql`
    {
      organization(login: "${orgName}") {
        repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            name
            defaultBranchRef {
              target {
                ... on Commit {
                  history(first: 1) {
                    nodes {
                      committedDate
                      oid
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await request(endpoint, query, {}, headers);
    let latestCommitInfo = { committedDate: '', oid: '', repositoryName: '' };

    data.organization.repositories.nodes.forEach((repo) => {
      const commit = repo.defaultBranchRef?.target.history.nodes[0];
      if (commit && (!latestCommitInfo.committedDate || new Date(commit.committedDate) > new Date(latestCommitInfo.committedDate))) {
        latestCommitInfo = {
          committedDate: commit.committedDate,
          oid: commit.oid,
          repositoryName: repo.name
        };
      }
    });

    return latestCommitInfo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

app.get(' ', async (req, res) => {
  try {
    const latestCommitInfo = await fetchLatestCommitInfo(process.env.ORG_NAME);
    if (latestCommitInfo.committedDate) {
      res.json(latestCommitInfo);
    } else {
      res.status(404).send('No commits found');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
