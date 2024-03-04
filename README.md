# The [FullStacksDev](https://FullStacks.dev) Angular and Firebase base template

Part of the curated [**FullStacksDev Angular and Firebase tech stack**](https://FullStacks.dev/TODO). For solo devs and very small teams.

A great starting point for building your own web app — aiming to be lean and useful enough so you can hit the ground running and focus on stuff that matters. You are free to use it as you want, whether it's to build a prototype, an internal tool, a side project, or the next million-dollar app.

This base template gives you an empty app skeleton with the following included:

- Simple folder-based monorepo with completely separate frontend ([`app`](./app)) and backend ([`firebase`](./firebase/)) folders (with a VSCode workspace config to work on both at the same time).
- A place for shared common code between frontend and backend ([`firebase/common`](./firebase/common/)).
- Modern Angular features configured and used throughout (inject function, signals, signal inputs, router input bindings, control flow, etc.)
- Full Firebase local development and testing using the Firebase Emulator Suite (with local persistence of emulator data)
- Firebase Hosting, Auth, Firestore, Realtime Database, Cloud Functions and Cloud Storage all set up and ready to use.
- Firebase Hosting configured with appropriate caching rules.
- Basic progressive web app (PWA) set up (manifest, service worker, icons, etc) with in-app update notification.
- Static pre-rendered pages (home and about), configured to work with Firebase Hosting and the PWA set up.
- State management using NgRx Signals.
- Global auth store and auth guard.
- Login flow using [Firebase Auth's Email Link](https://firebase.google.com/docs/auth/web/email-link-auth).
- Angular Material and Tailwind CSS (with styling overrides to make them work well together).
- Client side helpers to inject Firebase services.
- [RxFire](https://github.com/FirebaseExtended/rxfire) used for Observable wrappers for Firebase access.
- Client side logging using [consola](https://github.com/unjs/consola).
- VSCode, ESLint, Prettier, etc. all set up for a consistent development experience.
- Continuous integration (CI) set up with GitHub Actions (for linting, tests and builds).
- Deploy script to deploy to a "live" Firebase project (which you set up).
- Basic app tests using Jasmine and ng-mocks.
- Firebase security rules test suites using the Firebase Emulator Suite.

For more details see the "Architecture and design decisions" section below.

## The tech stack

> [!NOTE]
> Basic familiarity with the technologies / services listed is required to make the best of this tech stack and template.

- [Node.js](https://nodejs.org/en/) v20.x
- [TypeScript](https://www.typescriptlang.org/) v5.3
- [Angular](https://angular.io/) v17.2
- [Angular Material](https://material.angular.io/) v17.2
- [Tailwind CSS](https://tailwindcss.com/) v3.4
- [NgRx Signals](https://ngrx.io/guide/signals) v17.1
- [RxFire](https://github.com/FirebaseExtended/rxfire) v6
- [Firebase](https://firebase.google.com/)
  - [Hosting](https://firebase.google.com/products/hosting)
  - [Authentication](https://firebase.google.com/products/auth)
  - [Firestore](https://firebase.google.com/products/firestore)
  - [Realtime Database](https://firebase.google.com/products/realtime-database)
  - [Cloud Functions](https://firebase.google.com/products/functions)
  - [Cloud Storage](https://firebase.google.com/products/storage)

### For local development, testing and deployment

- [Git](https://git-scm.com/) for version control.
- [GitHub](https://github.com/) for hosting the code and running the CI pipeline.
- [VSCode](https://code.visualstudio.com/) as the main editor.
- [pnpm](https://pnpm.io/) as the package manager.
- [Angular CLI](https://angular.io/cli).
- [Firebase CLI](https://firebase.google.com/docs/cli).
- [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite) for local Firebase services.
- [ESLint](https://eslint.org/) for linting.
- [Prettier](https://prettier.io/) for code formatting.
- [Jasmine](https://jasmine.github.io/) for Angular unit testing.
- [ng-mocks](https://ng-mocks.sudo.eu/) for Angular testing and mocking helpers.
- [Vitest](https://vitejs.dev/guide/why) for Firebase testing.

## How do I use this template?

Full instructions on how to use this template are outlined below.

This template is designed to be easily reused as part of the GitHub new repo creation flow, using [GitHub's template repository feature](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository).

### Pre-requisites — what you need locally before you start

- [Node.js](https://nodejs.org/en/)
  - It's recommended to use [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions locally. You can run `nvm use` in the root of the repo to use the correct Node.js version (picked up from the `.nvmrc` file).
- [pnpm](https://pnpm.io/)
  - You can install this globally with `npm install -g pnpm`.
- [Git](https://git-scm.com/)
  - You can use the GitHub Desktop app (or similar tool) if you prefer.
- [VSCode](https://code.visualstudio.com/)
  - You're welcome to use a different editor, but the workspace settings and integrations are set up for VSCode.
- [Angular CLI](https://angular.io/cli)
  - You can install this globally with `npm install -g @angular/cli`.
  - If you want, you can also set `pnpm` as the default package manager for Angular CLI by running `ng config -g cli.packageManager pnpm` (not necessary for this project, but useful for other projects).
- [Firebase CLI](https://firebase.google.com/docs/cli)
  - You can install this globally with `npm install -g firebase-tools`.
  - You'll also need to log in using `firebase login`.

### Steps to create your own app from this template

1. Create a new GitHub repo from the base template.
   - See [the GitHub instructions on how to create a new repo from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) (either via the GitHub UI or the GitHub CLI).
   - We recommend **not** selecting "Include all branches" when creating the new repo.
1. Git clone your new repo locally.
   - You can find instructions for this in the GitHub UI after creating the repo.
1. Open a terminal and open the following 3 panes / tabs:
   1. For the root of the project: `cd` into the root of the repo
   1. For the `app` folder: `cd` into the `app` folder within the repo
   1. For the `firebase` folder: `cd` into the `firebase` folder within the repo
1. Run `pnpm install` in both the `app` and `firebase` folders.
1. Run `./edit` in the root to open VSCode with the workspace.
   - This will open the workspace with the `app` and `firebase` folders as separate groups in the explorer.
   - The workspace settings come with some extension recommendations. When you first open the workspace you may be alerted to this and given the option to install them (the alert only shows if you don't already have them installed). It's highly recommended to install these extensions to get the best development experience.
1. Update the `window.title` in the `project.code-workspace` file.
   - You can open this file to edit by opening the VSCode command palette and searching for (and selecting) "Preferences: Open Workspace Settings (JSON)".
1. Update the app name in a couple of places:
   - `app/src/manifest.webmanifest` — update the `name` and `short_name` fields.
   - `app/src/index.html` — update the `<title>` tag.
1. Set up your live Firebase project and add the configuration to the app:
   1. See the next section for instructions on how to set up your "live" Firebase project, and then come back here.
   1. Take the newly created "PWA" config from the step above and update the `firebaseConfig` object in the `environment.live.ts` file.
   1. Update the project ID in `.firebaserc`
1. Run `pnpm dev` in both the `app` and `firebase` folders (in the separate terminal tabs).
   - This will start the separate local development servers for the frontend and backend, including the Firebase Emulator Suite.
1. Open a browser tab to `http://localhost:4200` and check that the app is running.
1. Customize the `HomePageComponent` to add some project specific text and test that it all looks and works okay locally.
1. Run `pnpm test` in both the `app` and `firebase` folders to check that all existing tests pass.
   - Note: to exit out of the dev processes (from the previous step) you can press `Cmd+C` or `Ctrl+C` in the terminal.
   - You should notice that the `HomePageComponent` test fails because you've changed the text. Fix this test to have the updated text and watch as the test suite goes green.
1. Run `pnpm build` in the `app` folder to test the production build.
   - Note: this is not necessary to do a deploy, but it's useful to check that the production build works as expected.
1. Edit or delete the root `README.md` file as you see fit.
   - Because VSCode Workspaces [don't support adding single files](https://github.com/microsoft/vscode/issues/45177), you can open the files at the root of the repo (like `README.md`, `edit` and `deploy`) by running `code {filename}` in the terminal (in the root folder). This will open the file in the current VSCode window.
1. Commit your changes to a branch in your local Git repository and push to GitHub, then open a pull request (PR) from your branch (on GitHub).
   - It's good to get in the habit of pushing changes up to GitHub, preferably in a separate branch first, as you work on your app.
   - When you make (or update) a pull request (PR) on GitHub, or merge to the `main` branch, the CI pipeline will run the linting, tests and build processes to check that everything is okay. Once this is green you can continue with the deploy locally.
1. Run `./deploy` in the root to build and deploy the app to the live Firebase project.
   - This script will prompt you for confirmation before running anything.
   - It will fail if you haven't already logged into to Firebase using `firebase login` locally.
   - The first time you run this, Firebase will likely ask you to enable more permissions on the project. Go ahead and do this when prompted.
1. Open the link to the live site (from the Firebase deploy output) and check that it all works as expected.
1. Celebrate! 🎉
1. Start building your app.
   - See the "Architecture and design decisions" and "How-to guides" sections below for more details.

### Setting up your "live" Firebase project

1. Go to the [Firebase Console](https://console.firebase.google.com/).
1. Click "Add project" and follow the steps to create a new project.
   - Tip: call your project "{project name} LIVE" to make it stand out in the list of projects.
   - Don't enable Google Analytics.
1. Once the project is created, let's configure some settings and services:
   1. Click the cog icon next to "Project Overview" ar the top of the left hand sidebar and select "Project settings".
      1. Set the "Default GCP resource location" to the location closest to you. Note that this cannot be changed later so choose wisely.
      1. Set the "Environment type" to "Production".
      1. In the "Your apps" section click the icon representing web app ("</>") and give the app a name, like "PWA". You can skip the Firebase Hosting setup for now. You'll copy the config at the end of this Firebase project set up process (see below).
   1. If you plan on using Firebase Functions then you need to be on [a paid plan](https://firebase.google.com/pricing) (as Functions are not supported on the free tier). Use the "Upgrade" button at the bottom of the left hand sidebar (this will need a billing account to be set up).
      - The base template doesn't come with functions out of the box so it can be used on [the free tier](https://firebase.google.com/pricing) if needed.
      - You'll be able to set a budget alert as part of the upgrade process.
      - IMPORTANT: Firebase won't actually stop charging you if you go over the budget amount, so keep a very close eye on usage and make sure you understand your usage patterns (and the costs associated with them).
        - This is covered in more detail in the [advanced example app](TODO).
   1. Click "Authentication" in the left hand menu (under "Build") and enable the "Email/Password" sign-in method together with the "Email link (passwordless sign-in)" option too (on the same page).
   1. Click "Firestore" (under "Build") in the left hand menu and create a Firestore database.
      - Make sure to select a location that matches (or is close to) the "Default GCP resource location" you set earlier.
      - Start in "production mode" for now.
      - Note: sometimes, this process fails or the Firestore database is created in "datastore mode" instead of "native mode". If this happens, go to the <https://console.cloud.google.com/> and find that Firestore instance and click on the option to switch to "native mode". (I know, this is annoying, sorry).
   1. Click "Realtime Database" (under "Build") in the left hand menu and create a Realtime Database.
      - Make sure to select a location that matches (or is close to) the "Default GCP resource location" you set earlier.
      - Start in "locked mode" for now.
      - Note: after this is created, you may need to go back to the config and copy the
   1. Click "Storage" (under "Build") in the left hand menu and click on "Get started" and create it.
      - Start in "production mode" for now.
   1. Click "Hosting" (under "Build") in the left hand menu and set up Firebase Hosting.
      - You can skip the instructions they give as that should all be done already.
   1. Go back to the "Project setting" and copy the `firebaseConfig` object — you'll need this to continue setting up the app.

### Quick overview

- The Angular app is in the `app` folder.
- All static pre-rendered pages are in the `app/src/app/website` folder.
- Shared code for the app is in the `app/src/app/shared` folder.
- The Firebase config etc. is all in the `firebase` folder.
- The code for the Firebase functions are in the `firebase/functions` folder.
- Shared common code is in the `firebase/common` folder
  - The app can use anything exported here by importing from `@common`.
- All Firebase security rules (for Firestore, Realtime Database and Storage) are managed in their relevant files in the `firebase` folder, and are deployed with the app to the live Firebase project.

### Tips and tricks

- To configure various aspects of Firebase (like a custom domain name, emails, etc.) see the "How-to guides" section below.
- The Firestore and Realtime Database security rules ([`firestore.rules`](./firebase/firestore.rules) and [`database.rules.json`](./firebase/database.rules.json), respectively) are locked down by default. You'll need to update these as you start interacting with Firestore and Realtime Database in your app.
  - If you only plan to use these from the backend functions then you can keep the rules locked down, as the Firebase Admin SDK has full access.

## Local development, testing and deploy

Open VSCode with the workspace:

```shell
./edit
```

Run dev servers, in both the `app` and `firebase` folders:

```shell
pnpm dev
```

Run the linter (ESLint), in both the `app` and `firebase` folders:

```shell
pnpm lint
```

Run tests, in both the `app` and `firebase` folders:

```shell
pnpm test
```

Build the app (if you want to test the production build test locally), in the `app` folder:

```shell
pnpm build
```

Deploy the app to the "live" Firebase project, in the root folder:

```shell
./deploy
```

## Updating

### How to update your app with the latest base template

TODO

### How to update dependencies

TODO

## Architecture and design decisions

This section goes through the overall architecture and design decisions made for this template (and the associated [FullStacksDev](https://FullStacks.dev) Angular and Firebase tech stack).

### Folder-based monorepo structure

TODO

### The shared "common" code between frontend and backend

TODO

### Frontend (app) architecture and folder structure

TODO

- Static pre-rendered pages vs dynamic
- Shared folder
- Top level feature-based folders
- High level type-based folders within feature and shared folders. (Inspired by Nx — TODO: link the relevant Nx doc page).

### Backend (Firebase) architecture and folder structure

TODO

### Firebase Hosting and PWA set up

TODO

### Local development and testing using the Firebase Emulator

TODO

Demo project...

This does mean you can't use Firebase services that don't support the local emulator.

### One "live" Firebase project / environment

TODO

### How the deploy works

TODO

### State management using NgRx Signals

TODO

### Authentication and login flow

TODO

## How-to guides

### Adding a new static / pre-rendered page

TODO

### Adding your dynamic app

TODO

### Setting up a custom domain

TODO

### Customizing the Firebase emails

TODO

## How we decide what goes into the base template

It's important that the base template is as lean and broadly useful as possible, whilst maintaining the opinionated approach to the tech stack, architecture and patterns that we are developing as part of the _curated tech stacks_ approach in [FullStacksDev](https://FullStacks.dev).

For this reason, we carefully consider what goes into the base template and err on the side of caution. New capabilities are only added to the base template when they are proven to be broadly useful and fit within the tech stack, by first applying them to real-world projects and the example apps.

## What next? Check out the example apps for this tech stack…

If you want to continue learning more about the [FullStacksDev](https://FullStacks.dev) Angular and Firebase tech stack you can check out the simple and advanced example apps that are built using this template:

- [Simple example app](TODO)
- [Advanced example app](TODO)

These apps showcase the capabilities of the tech stack and give you an opinionated, pragmatic and in-depth learning experience. Each come with comprehensive documentation and learning content covering architecture, design decisions, data models, patterns, practices, tech stack capabilities and more.

You can read more about the purpose and specs of the example apps here: TODO: link to the example apps spec page
