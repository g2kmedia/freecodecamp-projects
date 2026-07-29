# MongoDB Database Cleanup Script

A simple Node.js script that drops all collections from specified MongoDB databases. Perfect for cleaning demo environments, test databases, or any scenario where you need a fresh start.

## What it does

- Connects to each specified database
- Finds all collections in each database
- Drops each collection completely (documents, indexes, and structure)

## Local Setup & Usage

1. Install dependencies: `npm install`.
1. Create a `.env` file with the help of `sample.env`.
1. Run the script: `npm start`.

## GitHub Actions Setup & Usage
This repository includes a GitHub Action that automatically runs by default the cleanup script monthly. The action also includes a manual trigger.

1. Configure the environmental variables as [GitHub Secrets](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository) AND/OR [GitHub Variables](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables#creating-configuration-variables-for-a-repository). Refer to the `sample.env` file.
1. (Optional) Change schedule. Edit the `cron` expression inside `mongodb-cleanup.yml`
1. (Optional) [Trigger action manually](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow).

## Important Notes

⚠️ **This script drops collections entirely** - all data, indexes, and collection structure are removed.

✅ **Collections auto-recreate** - MongoDB automatically recreates collections and databases when your application inserts new documents. So your application should still be functional afterwards as long as it does not depend on data from the removed collections.

## Requirements

- Node.js 20+
- MongoDB connection with read/write permissions
