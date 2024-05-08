# The [FullStacksDev](https://FullStacks.dev) Angular and Firebase base template

Part of the curated [**FullStacksDev Angular and Firebase tech stack**](https://FullStacks.dev/TODO). For solo devs and very small teams.

An opinionated full-stack starting point for building a web app, using Angular and Firebase. Aiming to be lean and useful enough so you can hit the ground running and focus on stuff that matters.

You are free to use and customize this template as you want — build a prototype, an internal tool, a side project, or the next million-dollar web app.

## Features

This template gives you an empty app skeleton, working end-to-end, with the following included:

- Simple folder-based monorepo with completely separate frontend ([`app`](./app)) and backend ([`firebase`](./firebase/)) folders, with a VS Code workspace config to work on both folders at the same time.
- A place for shared common code (especially TypeScript types) between frontend and backend ([`firebase/common`](./firebase/common/)).
- Modern Angular features configured and used throughout (`inject` function, signals, signal inputs, signal outputs, router input bindings, control flow, etc.)
- Full Firebase local development and testing using the Firebase Emulator Suite (with local persistence of emulator data).
- Firebase Hosting, Auth, Firestore, Realtime Database, Cloud Functions and Cloud Storage all set up and ready to use.
- Firebase Hosting configured with appropriate caching rules.
- Basic progressive web app (PWA) set up (manifest, service worker, icons, etc) with in-app update notification.
- Static prerendered pages set up, configured to work properly with Firebase Hosting and the PWA configuration.
- State management using NgRx Signals.
- Global auth store and auth guard.
- Login flow using [Firebase Auth's Email Link](https://firebase.google.com/docs/auth/web/email-link-auth).
- Angular Material and Tailwind CSS, with styling overrides to make them work well together.
- Helpers to inject Firebase services into Angular components, services, etc.
- [RxFire](https://github.com/FirebaseExtended/rxfire) used for Observable wrappers for Firebase access in the frontend.
- Frontend logging using [consola](https://github.com/unjs/consola).
- VS Code, ESLint, Prettier, etc. all set up for a consistent and clean development experience.
- Continuous integration (CI) set up with GitHub Actions (for linting, tests and builds).
- Deploy script to deploy to a "live" Firebase project (which you set up).
- Basic frontend tests, using Jasmine and ng-mocks.
- Firebase security rules test suites using the Firebase Emulator Suite, using Vitest.

For more details see the [Architecture and design decisions](./ARCHITECTURE.md) doc.

## The tech stack

> [!NOTE]
>
> Basic familiarity with the technologies and services listed is required to make the best of this tech stack and template.

- [Node.js](https://nodejs.org/en/) v20.x
- [TypeScript](https://www.typescriptlang.org/) v5.4
- [Angular](https://angular.dev/) v17.3
- [Angular Material](https://material.angular.io/) v17.3
- [Tailwind CSS](https://tailwindcss.com/) v3.4
- [NgRx Signals](https://ngrx.io/guide/signals) v17.2
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
- [VS Code](https://code.visualstudio.com/) as the main editor.
- [pnpm](https://pnpm.io/) as the package manager and script runner.
- [Angular CLI](https://angular.io/cli)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite) for local Firebase services.
- [ESLint](https://eslint.org/) for linting.
- [Prettier](https://prettier.io/) for code formatting.
- [Jasmine](https://jasmine.github.io/) for Angular unit testing.
- [ng-mocks](https://ng-mocks.sudo.eu/) for Angular testing and mocking helpers.
- [Vitest](https://vitejs.dev/guide/why) for Firebase testing.

## Using this template

Full instructions on how to use this template are outlined below.

> [!NOTE]
>
> This template is designed to be easily reused as part of the GitHub new repo creation flow, using [GitHub's template repository feature](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository).

### Prerequisites

What you need locally before you start:

- [Node.js](https://nodejs.org/en/)
  - It's recommended to use [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions locally. You can then run `nvm use` in the root of the repo to use the correct Node.js version (picked up from the `.nvmrc` file).
  - If installing manually, see the version in the `.nvmrc` file for the correct version to install.
- [pnpm](https://pnpm.io/)
  - You can install this globally with `npm install -g pnpm`.
- [Git](https://git-scm.com/)
  - You can also use the GitHub Desktop app (or similar tool) if you prefer.
- [VS Code](https://code.visualstudio.com/)
  - You're welcome to use a different editor, but the workspace settings and integrations are set up for VS Code, and work well out of the box.
- [Angular CLI](https://angular.io/cli)
  - You can install this globally with `npm install -g @angular/cli`.
  - If you want, you can also set `pnpm` as the default package manager for Angular CLI by running `ng config -g cli.packageManager pnpm` (not necessary for this project, but useful for other projects).
- [Firebase CLI](https://firebase.google.com/docs/cli)
  - You can install this globally with `npm install -g firebase-tools`.
  - You'll also need to log in using `firebase login`.
- Java JDK version 11 or higher
  - To run the Firebase Emulator Suite locally.

### Steps to create your own app from this template

1. Create a new GitHub repo from the base template.
   - See [the GitHub instructions on how to create a new repo from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) (either via the GitHub UI or the GitHub CLI).
   - We recommend **not** selecting "Include all branches" option when creating the new repo.
1. Git clone your new repo locally.
   - You can find instructions for this in the GitHub UI after creating the repo.
   - You can also use the GitHub Desktop app (or similar tool) if you prefer.
1. Open a terminal (we recommend [iTerm](https://iterm2.com/) if on macOS) and open the following 3 panes or tabs:
   1. One for the root of the project — `cd` into the root of the repo.
   1. One for the `app` folder — `cd` into the `app` folder within the repo.
   1. One for the `firebase` folder — `cd` into the `firebase` folder within the repo.
1. Run `pnpm install` in both the `app` and `firebase` folders (in the separate terminal tabs)
1. Run `./edit` in the root to open VS Code with the workspace.
   - This will open the workspace with the `app` and `firebase` folders as separate groups in the explorer.
   - The workspace settings come with some extension recommendations. When you first open the workspace you may be alerted to this and given the option to install them (the alert only shows if you don't already have them installed). It's highly recommended to install these extensions to get the best development experience.
1. Update the `window.title` in the `project.code-workspace` file.
   - You can open this file to edit by opening the VS Code command palette and searching for (and selecting) "Preferences: Open Workspace Settings (JSON)".
1. Update the app name in a couple of places:
   - `app/src/manifest.webmanifest` — update the `name` and `short_name` fields.
   - `app/src/index.html` — update the `<title>` tag.
1. Run `pnpm dev` in both the `app` and `firebase` folders (in the separate terminal tabs).
   - This will start the separate local development servers for the frontend and backend, including the Firebase Emulator Suite.
1. After the dev server processes have finished starting up, open a browser tab to `http://localhost:4200` and check that the app is running.
   - We highly recommend always opening the console / dev tools in the browser to check for any errors or warnings (and to view log messages in dev mode).
1. Customize the `HomePageComponent` to add some project specific text and test that it all looks and works okay locally.
1. Run `pnpm test` in both the `app` and `firebase` folders to check that all existing tests pass.
   - Note: to exit out of the dev processes (from the previous step) you can press `Ctrl+C` in the terminal.
   - You should notice that the `HomePageComponent` test fails because you've changed the text. Fix this test to have the updated text and watch as the test suite goes green.
1. Run `pnpm build` in the `app` folder to test the production build.
   - Note: this is not necessary to do a deploy, but it's useful to check that the production build works as expected.
1. Edit or delete the root `README.md` and `ARCHITECTURE.md` files as you see fit.
   - You're welcome to keep these in your project and adapt them to your needs. Or feel free to delete them.
   - Because VS Code Workspaces [don't support adding single files](https://github.com/microsoft/vscode/issues/45177), you can open the files at the root of the repo (like `README.md`, `ARCHITECTURE.md` `edit` and `deploy`) by running `code {filename}` in the terminal (in the root folder). This will open the file in the current VS Code window.
1. Set up your live Firebase project and add the configuration to the app:
   1. See the next section for instructions on how to set up your "live" Firebase project, and then come back here.
   1. Take the newly created "PWA" config from the step above and update the `firebaseConfig` object in the `environment.live.ts` file.
   1. Update the project ID in `.firebaserc` to match the ID of your live Firebase project.
1. Commit your changes to a branch in your local Git repository and push to GitHub, then open a pull request (PR) from your branch (on GitHub).
   - It's good to get in the habit of pushing changes up to GitHub, preferably in a separate branch first, as you work on your app.
   - When you make (or update) a pull request (PR) on GitHub, or merge to the `main` branch, the CI pipeline will run the linting, tests and build processes to check that everything is okay. It's good to wait until this is green before you run the deploy locally.
1. Run `./deploy` in the root to build and deploy the app and Firebase bits to the live Firebase project.
   - This script will prompt you for confirmation before running anything.
   - It will fail if you haven't already logged into to Firebase using `firebase login` locally.
   - The first time you run this, Firebase will likely ask you to enable more permissions on the project. Go ahead and do this when prompted.
1. Open the link to the live site (from the end of the deploy output) and check that it all works as expected.
1. Celebrate! :tada:
   - You've set up a new app from the base template and deployed it to a live Firebase project.

### Setting up your "live" Firebase project

1. Go to the [Firebase Console](https://console.firebase.google.com/).
1. Click "Add project" and follow the steps to create a new project.
   - Tip: call your project "{project name} LIVE" to make it stand out in the list of projects.
   - Don't enable Google Analytics.
1. Once the project is created, let's configure some settings and services:
   1. Click the cog icon next to "Project Overview" at the top of the left-hand sidebar and select "Project settings".
      1. Set the "Default GCP resource location" to the location closest to your users. Note that this cannot be changed later so choose wisely.
      1. Set the "Environment type" to "Production".
      1. In the "Your apps" section click the icon representing web app ("</>") and give the app a name, like "PWA". You can skip the Firebase Hosting setup for now.
         - After this app entry is created you'll be shown some config. Ignore this for now as you'll copy the config at the end of this Firebase project set up process (see below).
   1. To use Firebase Functions you need to be on [a paid plan](https://firebase.google.com/pricing) (as Functions are not supported on the "no-cost" tier). Use the "Upgrade" button at the bottom of the left-hand sidebar (this will need a billing account to be set up).
      - Note: the base template is already set up to use and deploy functions but does not come with any actual functions out of the box, so it can be used on [the free tier](https://firebase.google.com/pricing) if needed, but only after some modifications — see the relevant "how-to" guide below for removing services like functions etc.
      - You'll be able to set a budget alert as part of the upgrade process.
      - IMPORTANT: Firebase won't actually stop charging you if you go over the budget amount, so keep a very close eye on usage and make sure you understand your usage patterns (and the costs associated with them).
   1. Click "Authentication" in the left-hand menu (under "Build") and enable the "Email/Password" sign-in method together with the "Email link (passwordless sign-in)" option too (on the same page).
   1. Click "Firestore" (under "Build") in the left-hand menu and create a Firestore database.
      - Make sure to select a location that matches (or is close to) the "Default GCP resource location" you set earlier.
      - Start in "production mode".
      - Note: sometimes, this process fails or the Firestore database is created in "datastore mode" instead of "native mode". If this happens, go to the <https://console.cloud.google.com/> and find that Firestore instance and click on the option to switch to "native mode". (I know, this is annoying, sorry).
   1. Click "Realtime Database" (under "Build") in the left-hand menu and create a Realtime Database.
      - Make sure to select a location that matches (or is close to) the "Default GCP resource location" you set earlier.
      - Start in "locked mode".
   1. Click "Storage" (under "Build") in the left-hand menu and click on "Get started" and create it.
      - Start in "production mode".
   1. Click "Hosting" (under "Build") in the left-hand menu and set up Firebase Hosting.
      - You can skip the instructions they give as that should all be done already.
   1. Go back to the "Project settings" and copy the `firebaseConfig` object from the previously registered "PWA" app — you'll need this to continue setting up the app.

### Quick overview to get started

- The Angular app is in the `app` folder.
- All static prerendered pages are in the `app/src/app/website` folder.
- You can start adding your app specific features in `app/src/app/*` folders and hooking up routing.
- Shared code just for the frontend app is in the `app/src/app/shared` folder.
- The Firebase config etc. is all in the `firebase` folder.
- Firebase backend functions code go in the `firebase/functions` folder.
- Shared common code (accessible by both the frontend app and Firebase functions code) is in the `firebase/common` folder
  - The app can use anything exported here by importing from `@common`.
  - The Firebase functions code can use relative imports directly to this folder.
- All Firebase security rules (for Firestore, Realtime Database and Storage) are managed in their relevant files in the `firebase` folder, and are deployed with the app to the live Firebase project.
  - Note that these are locked down by default — you'll need to update them as you start interacting with Firestore, Realtime Database and Storage in your app.
  - If you only plan to use these services from the backend functions then you can keep the rules locked down, as the Firebase Admin SDK has full access (i.e. bypasses all security rules).
- You can configure various aspects of Firebase (like a custom domain name, emails, etc.) in the Firebase Console. We provide some basic "how-to" guides below to help with this.

## Local development, testing and deploy commands

### Open VS Code with the workspace

```shell
./edit
```

### Run dev servers

You'll need to run this separately in both the `app` and `firebase` folders:

```shell
pnpm dev
```

Note: the dev process for the `firebase` folder will also run the Firebase Emulator Suite for you.

### Run the linter (ESLint)

You'll need to run this separately in both the `app` and `firebase` folders:

```shell
pnpm lint
```

### Run tests

You'll need to run this separately in both the `app` and `firebase` folders:

```shell
pnpm test
```

### Build the app

If you want to test the production build locally. Run this in the `app` folder:

```shell
pnpm build
```

### Deploy

This deploys the Angular app and Firebase bits to the "live" Firebase project. Run this in the root folder:

```shell
./deploy
```

## Updating

For apps built on this base template there are two things you need to do to keep updated to the latest dependencies and base template:

1. _[Whenever you want]_ Update the dependencies in the `app` and `firebase` folders.
1. _[When there's a new base template release]_ Perform specific tasks to match any new or updated base template bits, as specified in release notes, and at your discretion (depending on how far you've deviated from the base template, and what is relevant to your app).

### 1. How to update dependencies

You can update some or all of the dependencies in the `app` and `firebase` folders using `pnpm` (our chosen pack manager):

For the `app` folder:

1. First run `pnpm ng update` and follow the instructions.
   - This will update the Angular specific dependencies (and any other dependencies that support Angular Schematics).
   - You can choose to skip this step, especially if there is a major version of Angular with breaking changes (in which case you could choose to wait until the base template has been updated first).
1. Then run `pnpm update --interactive --latest` and follow the instructions.
   - You can select the packages you want to update.

For the `firebase` folder:

1. Run `pnpm update --interactive --latest` and follow the instructions.
   - You can select the packages you want to update.

Make sure to do all this in a branch, test locally and push to GitHub, then open a PR to trigger the continuous integration pipeline (which runs the linter, tests, etc.) and wait until it's green. You'll also want to then do a deploy to your live Firebase project to make sure everything works as expected.

> [!IMPORTANT]
>
> This is like any other dependency update process and can sometimes require changes to your code. Especially with major version updates with breaking changes. We aim to keep the base template up-to-date with the latest versions of dependencies, and if these result in changes to the code we make a new release of the base template with specific instructions on what to do. See the next section for more on this.

> [!TIP]
>
> Sometimes, especially with major version updates, you may need to delete the `node_modules` folder and `pnpm-lock.yaml` file, and then run `pnpm install` to rebuild the dependency tree and lockfile. This ensures the very latest dependencies (matched to the versions defined in the relevant `package.json`) are used (especially subdependencies).

### 2. How to update your app to a base template release

> [!NOTE]
>
> Once the base template is launched and in a stable version, there are unlikely to be frequent changes, so hopefully you won't need to do this often.
>
> Also, we won't usually make releases for simple dependency updates, or content changes.

Whenever we make a new release of the base template we will provide detailed release notes with specific instructions on what to do to update your app. These will contain specific code changes you can make (some may be optional), and it will all depend on how much you have deviated from the base template, and what is relevant to your app.

> [!IMPORTANT]
>
> We use the `TEMPLATE_VERSION` file to track what the current version of the template is. You will have this in your app as well, as a reference for the version of the base template you started with (or last updated to). Use this to find the release notes (possibly multiple) to go through.
>
> **And make sure you update this `TEMPLATE_VERSION` file as part of your update process.**

Go to the [releases page](https://github.com/FullStacksDev/angular-and-firebase-template/releases) to find the release notes for the version(s) you want to update to.

## Architecture and design decisions

We document the architecture and design decisions in [a separate doc](ARCHITECTURE.md).

Feel free to deviate from these as you wish. The base template is designed to be fairly flexible so you can adapt it to your needs.

> [!TIP]
>
> If you want to get the full "curated tech stack" experience check out the example apps for this tech stack (more info at the end of this doc).

## How-to guides

Here we document some how-to guides to help you get started with this base template.

> [!NOTE]
>
> It's recommended to familiarize yourself with the [architecture and design decisions](ARCHITECTURE.md) doc before diving into these guides.

### Adding a new static prerendered page

Say you want to add a new static prerendered page to the website part of your app, e.g. a "Contact us" page (served at `/contact`). Here's how you can do it:

1. Generate a new component in the [`app/src/app/website`](./app/src/app/website) folder:
   - In the `app` folder, run: `pnpm ng generate component website/feature/contact-page`
1. Add the new component to the website routes in the [`app/src/app/website/website.routes.ts`](./app/src/app/website/website.routes.ts) file.
   - Follow the example of the `'about'` route. So, add: `{ path: 'contact', component: ContactPageComponent },` in the `children` array.
1. Add an entry in the [`app/prerendered-routes.txt`](./app/prerendered-routes.txt) file.
   - Add a new line with `/contact` on it.
1. (Optionally) Add a nav entry in the [`app/src/app/website/website-shell.component.ts`](./app/src/app/website/website-shell.component.ts) file.
1. Check everything works locally by running the dev servers and inspecting the app locally.
1. Run `pnpm build` in the top-level `app` folder to test the production build.
   - Within the top-level `app` folder, you can inspect the `dist/app/browser` folder to check the prerendered HTML files.
1. Add an entry in the [`firebase/firebase.json`](./firebase/firebase.json) file (under the `hosting.rewrites` key) to serve the relevant prerendered HTML file for this new path.
   - Follow the example for the `/about` path.
   - Important: make sure this new entry comes _before_ the `**` catch-all entry.
1. Add an exclusion for this new path in the [`app/ngsw-config.json`](./app/ngsw-config.json) file (under the `navigationUrls` key).
   - So, add: `"!/contact"` to the end of the array.
1. Add content to this new page as you see fit.
1. Fix the tests and make sure everything works as expected.
1. Commit your changes and push to GitHub, opening a PR so the CI pipeline can run.
1. When the CI is green, deploy the app to your live Firebase project.
   - By running the `./deploy` script in the root folder, locally.

> [!TIP]
>
> Technically, you can make any route in the app a prerendered page — it doesn't have to be part of the 'website' feature folder. But it's a good idea to keep all the prerendered pages in one place for consistency.

### Adding a fully dynamic and lazily-loaded feature to your app

You'll likely have a main feature section of your app which will be the dynamic user-specific part of the app (together with other dynamic sections like admin, account, etc.)

> [!TIP]
>
> By "fully dynamic" we mean that all the logic, UI, etc. runs client-side (in the user's browser). The server (a static host in our case) just serves an empty shell to load the app. This is essentially a single-page app (SPA) architecture.

Say your main feature is a "dashboard", here's how you can add this to the app (as a fully dynamic and lazily-loaded feature):

1. Create a new feature folder: `app/src/app/dashboard`.
   - Within this folder you'll want to organize things within `data`, `feature`, `ui` and `util` subfolders (see the [architecture](./ARCHITECTURE.md) doc for details).
1. Create a routes file: `app/src/app/dashboard/dashboard.routes.ts`.
   - This file will define the routes for the feature as you would in any Angular app.
1. Register the parent path as a route in the `app/src/app/app.routes.ts` file.
   - You can follow the example of the `website` routes, setting your `path` to `/dashboard` (or whatever you prefer).
   - Note the use of `import('./dashboard/dashboard.routes')` here — this tells Angular to perform the lazy loading of the feature based on its routes.
1. You'll likely want a shell component for the feature, which all child routes will be rendered within.
   - Run `pnpm ng generate component dashboard/dashboard-shell` to generate this.
   - And register this as the component for the parent route in the `dashboard.routes.ts` file, with all child routes defined within.
   - This component will be the parent component for the feature, and will likely contain the main layout (with shared nav, etc.) It _must_ have a `<router-outlet />` in it to render the child routes.
1. You'll likely want to lock down everything within this feature to authenticated users only.
   - You can use the `authGuard` provided by the base template, by adding `canMatch: [authGuard('authed')]` to the parent route (the one where you specified the dashboard shell component).
   - You could instead choose to only secure particular child routes, by adding the `canMatch` property to those routes instead, leaving others open.
1. You'll likely want to add a nav entry for this feature on your website pages, so users can navigate to it.
   - Add this in [`app/src/app/website/website-shell.component.ts`](../app/src/app/website/website-shell.component.ts).
1. Your feature is ready for development.

### Configuring the PWA

The base template comes with a basic PWA setup, including a manifest file, service worker, etc. Here's how you can configure this for your app:

- Configure the app name, colors, icons, scope, start URL, etc. in: [`app/src/manifest.webmanifest`](./app/src/manifest.webmanifest).
  - This follows the regular [PWA manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) spec.
  - Also update the `theme-color` meta tag in the [`index.html`](./app/src/index.html) file to match.
- Update the icons in the [`app/src/assets/icons`](./app/src/assets/icons) folder.
- Configure the service worker in: [`app/ngsw-config.json`](./app/ngsw-config.json).
  - This is the Angular service worker config file ([docs](https://angular.io/guide/service-worker-config)).
  - Note that we provide a sensible set-up that works well with the combination of static prerendered pages and dynamic features in the app, so you may not need to change this (and should be careful when doing so).
- Configure the in-app update notification in: [`app/src/app/app.component.ts`](./app/src/app/app.component.ts).

> [!TIP]
>
> You are free to use more of the PWA features like background sync, push notifications, etc. as you see fit. The base template is set up to be a useful starting point for a PWA.

### Removing the PWA bits

You may not need the PWA bits in your app. Here's how you can remove them completely:

1. Delete the [`app/src/manifest.webmanifest`](./app/src/manifest.webmanifest) file.
1. Remove the mentions of this `manifest.webmanifest` file in the [`app/angular.json`](./app/angular.json) file.
1. Remove the manifest link in the [`index.html`](./app/src/index.html) file.
1. Delete any icons you don't need in the [`app/src/assets/icons`](./app/src/assets/icons) folder.
1. Delete the [`app/ngsw-config.json`](./app/ngsw-config.json) file.
1. Remove the `"serviceWorker": "ngsw-config.json"` bit in the [`app/angular.json`](./app/angular.json) file.
1. Remove the service worker registration in the [`app/src/app/app.config.ts`](./app/src/app/app.config.ts) file.
1. Update any tests that also do the service worker registration.
1. Remove the in-app update notification code in the [`app/src/app/app.component.ts`](./app/src/app/app.component.ts) file.
1. Remove the `@angular/service-worker` dependency from the [`app/package.json`](./app/package.json) file.
   - You'll need to run `pnpm install` in the top-level `app` folder to remove this dependency from your local `node_modules` folder and to update the `pnpm-lock.yaml` file.

### Removing Firebase services (like Functions and Storage)

You may not need all the Firebase services in your app, especially Firebase Functions which requires a paid plan.

Here's how to remove Firebase Functions from your app:

1. If you want to stay fully within the "no-cost" (aka free) tier of Firebase, make sure you don't upgrade the project in the Firebase Console (for the live project).
1. Update [`firebase/firebase.json`](./firebase/firebase.json):
   - Remove the whole `functions` top level config.
   - Remove the entries for the functions, pubsub and eventarc emulators.
1. It's easier to just keep the `firebase/functions` and `firebase/common` folders as they are — they won't be used or deployed.

Here's how to remove a service like Firebase Storage from your app (similar steps are applicable to Firestore and Realtime Database):

1. Make sure you don't enable the Storage service in the Firebase Console (when setting up your live project).
1. Update [`firebase/firebase.json`](./firebase/firebase.json):
   - Remove the `storage` top level key.
   - Remove the entry for the storage emulator.
1. Delete the security rules file: [`firebase/storage.rules`](./firebase/storage.rules).
1. Delete the corresponding security rules test suite file: [`firebase/test/storage/storage-rules.spec.ts`](./firebase/test/storage/storage-rules.spec.ts).
1. Make sure you don't use the `injectStorage` helper function in the frontend app.

> [!TIP]
>
> These steps are especially useful if you're using this base template to build a functional prototype or internal tool, where you don't need all the Firebase services.

### Setting up a custom domain

> [!NOTE]
>
> This guide assumes you have a domain name registered and have access to the DNS settings for this domain.

You can set up a custom domain for your Firebase app in the [Firebase Console](https://console.firebase.google.com/).

To do this, follow the latest docs from Firebase. As of writing, these are the high level steps we're aware of:

1. Custom domain set-up in the Hosting section
1. Custom domain set-up for the email sender in Authentication
1. Updated action link for the email templates in Authentication
1. Updated “authorized domains” in Authentication
1. Updated config in `environment.live.ts` in the app to reflect the new auth domain

### Customizing the Firebase emails

Some email templates (e.g. for Authentication) are customizable in the [Firebase Console](https://console.firebase.google.com/).

## How we decide what goes into the base template

It's important that the base template is as lean and broadly useful as possible, whilst maintaining the opinionated approach to the tech stack, architecture and patterns that we are developing as part of the _curated tech stacks_ approach in [FullStacksDev](https://FullStacks.dev).

For this reason, we carefully consider what goes into the base template and err on the side of caution. New capabilities are only added to the base template when they are proven to be broadly useful and fit within the tech stack, by first applying them to real-world projects and the example apps.

## What next? Check out the example apps for this tech stack…

If you want to continue learning more about the [FullStacksDev](https://FullStacks.dev) Angular and Firebase tech stack you can check out the premium example apps built using this template:

- [Simple example app](TODO)
- [Advanced example app](TODO)

These apps showcase the capabilities of the tech stack and give you an opinionated, pragmatic and in-depth learning experience. Each come with comprehensive documentation and learning content covering architecture, design decisions, data models, patterns, practices, tech stack capabilities and more.

You can read more about the purpose and specs of the example apps here: TODO: link to the example apps spec page

## License

This template is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

> [!IMPORTANT]
>
> This template is provided as-is and with no warranty nor liability whatsoever — please make sure you keep a close eye on any costs incurred as you'll be liable for these and anything else that arises from using this template. We recommend you review the code and architecture carefully and adapt it to your needs before deploying to a live project, paying close attention to [Firebase's pricing model](https://firebase.google.com/pricing).
