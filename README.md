# The [FullStacksDev](https://FullStacks.dev) Angular and Firebase base template

## How to use and set up this template

1. Start a new repo from the base template.
    - TODO: explain how to do this from the GitHub UI, as well as using the `gh` CLI.
1. Git clone it locally.
1. Open a terminal and open the following new panes / tabs:
    1. For the root of the project: `cd` into the root of the repo
    1. For the `app` folder: `cd` into the `app` folder within the repo
    1. For the `firebase` folder: `cd` into the `firebase` folder within the repo
1. Run `yarn install` in both the `app` and `firebase` folders.
1. Run `./edit` in the root to open VSCode with the workspace.
1. Update the `window.title` in the `project.code-workspace` file.
    - You can open this file to edit by opening the command palette and then searching for (and selecting) “Preferences: Open Workspace Settings (JSON)”.
1. Set up the live Firebase project:
    - Create a new Firebase project (TODO — need to write up these instructions).
    - Use the credentials from this to update the `environment.live.ts` file.
    - Update the project ID in `.firebaserc`
1. Run `yarn dev` in both the `app` and `firebase` folders.
1. Open a browser tab to `http://localhost:4200` and check that the app is running.
1. Customise the `HomePageComponent` to add some project specific text and test that it all looks and works okay locally.
1. Run `yarn build` to test the production build.
1. Test out a full deploy (run this in the root folder):

    ```bash
    mkdir -p firebase/dist && rm -rf firebase/dist/app && cd app && yarn build && cp -r dist/app/browser/. ../firebase/dist/app && cd .. && cd firebase && yarn deploy:live && cd ..
    ```

1. Open the link to the live site (from the Firebase deploy output) and check that it all works as expected.
