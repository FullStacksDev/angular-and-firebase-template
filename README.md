# The [FullStacksDev](https://FullStacks.dev) Angular and Firebase base template

## How to use and set up this template

1. Start a new repo from the base template.
   - TODO: explain how to do this from the GitHub UI, as well as using the `gh` CLI.
1. Git clone it locally.
1. Open a terminal and open the following 3 panes / tabs:
   1. For the root of the project: `cd` into the root of the repo
   1. For the `app` folder: `cd` into the `app` folder within the repo
   1. For the `firebase` folder: `cd` into the `firebase` folder within the repo
1. Run `pnpm install` in both the `app` and `firebase` folders.
1. Run `./edit` in the root to open VSCode with the workspace.
1. Update the `window.title` in the `project.code-workspace` file.
   - You can open this file to edit by opening the command palette and then searching for (and selecting) “Preferences: Open Workspace Settings (JSON)”.
1. Set up the live Firebase project:
   - Create a new Firebase project (TODO — need to write up these instructions).
   - Use the credentials from this to update the `environment.live.ts` file.
   - Update the project ID in `.firebaserc`
1. Run `pnpm dev` in both the `app` and `firebase` folders.
1. Open a browser tab to `http://localhost:4200` and check that the app is running.
1. Customise the `HomePageComponent` to add some project specific text and test that it all looks and works okay locally.
1. Run `pnpm build` in the `app` folder to test the production build.
1. Run `./deploy` in the root to deploy the app to the live Firebase project.
   - This script will prompt you for confirmation before running anything.
1. Open the link to the live site (from the Firebase deploy output) and check that it all works as expected.

## Tips and tricks

- Because VSCode Workspaces [don't support adding single files](https://github.com/microsoft/vscode/issues/45177), you can open the files at the root of the repo (like `README.md`, `edit` and `deploy`) by running `code {filename}` in the terminal (in the root folder). This will open the file in the current VSCode window.
