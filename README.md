# GitHub Organization Latest Commit Fetcher

This Node.js application utilizes Express and the GitHub GraphQL API to fetch the latest commit information from all repositories, both private and public, within a specified GitHub organization. It returns the most recent commit's date, its hash (OID), and the name of the repository it belongs to.

## Prerequisites

Before you run this application, ensure you have the following:

- Node.js installed on your machine.
- A GitHub personal access token with permissions to access repositories in the organization. [Create one here](https://github.com/settings/tokens).

## Setup

1. Clone this repository to your local machine.

2. Install the required dependencies by running:

```shell
yarn
```
or
```shell
npm i
```

3. Create a `.env` file in the root of your project and add your GitHub personal access token and the organization name:

```shell
GITHUB_TOKEN=your_github_personal_access_token
ORG_NAME=your_organization_name
```


## Running the Application

To start the server, run the following command in your terminal:

```shell
yarn start
```


The server will start on `http://localhost:3000`. To fetch the latest commit information, navigate to `http://localhost:3000/latest-commit-info` in your web browser or use a tool like Postman to make a GET request to that URL.

## Endpoint

- `GET /latest-commit-info`: Returns the latest commit's date, hash (OID), and the repository name it belongs to, from all the repositories within the specified organization.

## License

This project is open-sourced under the MIT License.
