# Architecture and design decisions

This document covers the overall architecture and design decisions made for this base template, and the associated [FullStacksDev](https://FullStacks.dev) Angular and Firebase tech stack.

> [!NOTE]
>
> Feel free to deviate from these as you wish. The base template is designed to be fairly flexible so you can adapt it to your needs. Though note that deviations may require more tinkering to get everything to work well together.
>
> If you're keen on the full _curated tech stack_ experience — where we build on top of this base template with more opinionated patterns, practices and approaches — then check out the [example apps](TODO).

> [!TIP]
>
> If you're reading this on GitHub's web UI you can view a table of contents by clicking the relevant button in the top right corner of the document.

## Key

To make the information skimmable and easier to understand, you'll see the following standout blocks throughout:

| **:brain: Design decision** |
| :-- |
| A decision that was made and why. Can cover any aspect: technical, architectural, design, UX, etc. |

| **:white_check_mark: Pattern** |
| :-- |
| A recommended way of doing something. This term is used loosely and non-formally, just as a way of saying “this is a thing we recommend you do in a particular context”. |

> [!IMPORTANT]
>
> A key point to remember.

> [!NOTE]
>
> Extra info to clarify a point or provide context.

> [!TIP]
>
> A tip or trick worth knowing about.

> [!WARNING]
>
> Gotchas and things to be careful about.

> [!CAUTION]
>
> More severe gotchas and things to watch out for.

## Overview

This base template is designed to be an opinionated starting point for a modern Angular app, connecting to Firebase services for all backend functionality (auth, db, APIs, etc.)

At a high level:

- The Angular app (in the `app` subfolder) is primarily a single-page app (SPA) with some prerendered static pages, deployed to Firebase Hosting. This is where you build your UI, handle user interactions, and manage state, communicating with Firebase services using the [Firebase JavaScript SDK](https://firebase.google.com/docs/reference/js).
- For Firebase (in the `firebase` subfolder), you define and deploy your own functions (if needed), security rules, database indexes and hosting config.
- You get certain functionality out of the box, such as a place for common code, authentication (with passwordless login), static website pages (which you fill in with your content), basic progressive web app (PWA) set-up, local Firebase emulators, test suites and so on.

> [!NOTE]
>
> Make sure you go through the first part of the [README](./README.md) for a list of the features you get out of the box. You'll also find instructions on setting up your own app from this base template.

For the rest of this document, we'll dive into the specifics of how things are set up and why.

## Folder-based monorepo structure

| **:brain: Design decision** |
| :-- |
| We use a simple folder-based monorepo structure with completely separate frontend ([`app`](./app)) and backend ([`firebase`](./firebase/)) folders. Each folder is isolated from the other — i.e. they have their own `package.json` etc. files and are completely separate codebases (though see the common code and deploy sections below for how they do connect up). |

This isolation is important as Firebase Functions currently deploy ALL dependencies in the relevant `package.json` and so it's important to keep the backend and frontend dependencies separate. It's also a useful separation of concerns when reasoning about how things work in your app.

> [!NOTE]
>
> This does mean you have to manage, install and update dependencies separately, for each subfolder.

A VS Code workspace config is provided to work on both at the same time, in a single VS Code window. The workspace also provides settings and recommended extensions that will help your development experience.

> [!TIP]
>
> Use the `./edit` script to open the workspace in VS Code (run this in the root of the repo).

## Shared common code between frontend and backend

| **:brain: Design decision** |
| :-- |
| We've included a lightweight mechanism for sharing simple code and TypeScript types between the frontend and backend — the `firebase/common` folder. |

When using the same language (in this case TypeScript) for both the frontend and backend, it's useful to have a place for shared common code, usually types, interfaces, utility functions, etc. This is especially useful for shared data models (like Firebase document structures).

The `firebase/common` folder is the place for this shared common code. We recommend exporting everything public in the [`firebase/common/index.ts`](./firebase/common/index.ts) file (also known as a "barrel" file).

> [!WARNING]
>
> It's highly recommended to only put types, interfaces and very simple utility functions here, and to not rely on any external libraries. Where you do want to rely on an external library (e.g. [type-fest](https://github.com/sindresorhus/type-fest/)) make sure the library is added to both the `app` and `firebase` `package.json` files.

> [!TIP]
>
> In the Angular app code, import from `@common` (which is an alias set up in the `tsconfig` file).
>
> In Firebase functions code, use relative imports to the `firebase/common` folder.

## Local development using the Firebase Local Emulator Suite

| **:brain: Design decision** |
| :-- |
| All local development is done against a locally running instance of the [Firebase Local Emulator Suite](https://firebase.google.com/docs/emulator-suite), running with a _demo_ project with no access to any live Firebase services.<br><br>This does mean we can’t make easy use of Firebase services that aren’t supported by the local emulator (e.g. Remote Config). |

> [!NOTE]
>
> To ensure that the Firebase emulators only run in “demo” mode, and never access any live Firebase services, we start the emulators with `--project=demo-local`. From the [docs](https://firebase.google.com/docs/emulator-suite/connect_functions#choose_a_firebase_project), a project ID starting with the prefix `demo-` will force the emulators to run in demo mode.
>
> Note that this also ensures that the functions running within the emulators (from the `firebase/functions` folder) can only access locally emulated services.

When you run the `pnpm dev` command in the `firebase` folder, the Firebase Local Emulator Suite is started up and connected to all your functions code (which are watched and compiled whenever changed) and security rules. Then, when you run the dev server for the Angular app (`pnpm dev` in the `app` folder) it's configured to use these emulators for all Firebase access, via the default environment config: [`app/src/environments/environment.ts`](./app/src/environments/environment.ts).

All data in the emulators is persisted to the `firebase/local` folder (on shutdown), so you can stop and start the emulators and your data will still be there (on the same machine).

## One "live" Firebase project / environment

| **:brain: Design decision** |
| :-- |
| Beyond local development, this base template assumes only one live Firebase project / environment (which you set up), as specified in the [`firebase/.firebaserc`](./firebase/.firebaserc) file.<br><br>We believe this is a good simple set-up to get you started, and for the first phase of your project (going from 0 to 1), after which you can always add intermediate environments for testing and less risky deploys / rollouts |

This live project is your **production** environment — what your users will access, and where all your real data will live.

The deploy script will deploy to this live project (details below).

> [!TIP]
>
> In the [advanced example app](TODO) we set up an intermediate staging environment, together with continuous deployment (CD), which requires a bit more set-up and configuration.

## How the deploy works

| **:brain: Design decision**                                                        |
| :--------------------------------------------------------------------------------- |
| Out of the box, all deployments happen from your local machine, controlled by you. |

The [`./deploy`](./deploy) script in the root of the project is a simple script that performs the following steps:

- Asks for confirmation first before carrying on.
- Cleans the `firebase/dist` folder in case there is an older build.
- Builds the Angular app (in production mode), which outputs to the `app/dist` folder.
- Copies over just the **browser** output from the Angular build to the `firebase/dist/app` folder (i.e. ignores the **server** folder).
  - This is because we don't use server-side rendering (SSR) (details below).
- Runs the `pnpm deploy:live` command in the `firebase` folder to trigger the Firebase deploy process to the `live` project.
  - This includes all the Firebase Functions code, security rules, the app assets and Firebase Hosting config.

> [!NOTE]
>
> This is designed to be run locally only (not as part of a CI/CD pipeline) as it benefits from your locally authenticated `firebase` CLI.
>
> For CI/CD you'd want to update the GitHub Actions pipeline to deploy to Firebase, which would involve setting up a service account and securely storing the credentials in GitHub Secrets so that the pipeline can authenticate with Firebase. We show you how to do this in the [advanced example app](TODO).

> [!IMPORTANT]
>
> We highly recommend waiting for the GitHub Actions pipeline to complete successfully before deploying from your local machine (which requires you to push your changes to the remote repository on GitHub and create a pull request (PR), or push directly to the `main` branch).

## [`app`] Modern Angular features

| **:brain: Design decision** |
| :-- |
| We use all the modern Angular features, such as `inject` function, signals, signal inputs, signal outputs, router input bindings, control flow, etc. |

| **:brain: Design decision** |
| :-- |
| We don't use [Angular modules (i.e. `@Module`)](https://angular.dev/guide/ngmodules) for our own code — we've chosen to go all-in on [Angular's recent **standalone** approach](https://angular.dev/guide/components/importing#standalone-components). So we only ever define (and prefer to import) standalone components, directives, etc.<br><br> The base template has configured the Angular CLI generator to always set the `standalone: true` flag on any components, directives, etc. you generate. |

| **:brain: Design decision** |
| :-- |
| We make two key decisions about Angular components (which all components generated from the Angular CLI use):<br><br><ol><li>The component template and styles are defined in the same file as the component's definition (commonly known as "single file components (SFC)"). We strongly prefer this approach as it keeps things in one logical place and also pushes us to define smaller components that don't do too much.</li><li>The [`OnPush` change detection strategy](https://angular.dev/best-practices/skipping-subtrees#using-onpush) is used by default, and we recommend ALL components use it. This is a more performant approach that [works well with Angular's signals](https://angular.dev/guide/signals#reading-signals-in-onpush-components), and since we use NgRx SignalStore you are unlikely to hit the cases where change detection is not triggered when it should be.</li></ol> |

> [!NOTE]
>
> With the `OnPush` change detection, there is a caveat that forms _sometimes_ don't behave well, so in rare cases you'd need to use the `ChangeDetectorRef` to manually mark a component for change detection — this is something we'll explore in the [advanced example app](TODO).

| **:brain: Design decision** |
| :-- |
| We also configure the Angular CLI generator to only ever generate _flat_ components, directives, etc. This means they don't get their own folder (for the file itself and the test file), as we think this is unnecessary given modern IDEs and the ability to easily browse and load files. |

## [`app`] Folder structure

Here are the main folders and files for the frontend `app/src` folder (some left out for brevity):

```text
app/src
└─ app
   └─ {your feature folder(s)}
      └─ data
      └─ feature
      └─ ui
      └─ util
   └─ login
      └─ {login feature files}
   └─ shared
      └─ auth
         └─ {auth store, services, guards, etc.}
      └─ firebase
         └─ {firebase helpers}
      └─ logger.ts
      └─ runtime.service.ts
   └─ website
      └─ feature
         └─ {components for the static pages}
      └─ ui
         └─ {UI components for the website feature}
      └─ website-shell.component.ts
      └─ website.routes.ts
   └─ app.component.ts
   └─ app.routes.ts
   └─ loader-shell.component.ts
└─ assets
   └─ {images, icons (incl PWA icons), fonts, etc.}
└─ environments
   └─ {environment files - live, test and local}
└─ styles
   └─ {SCSS partials and utilities}
└─ test
   └─ helpers
      └─ {test helpers}
└─ index.html
└─ manifest.webmanifest
└─ styles.scss
```

We'll refer to these in the rest of the document.

> [!NOTE]
>
> There are some files at the root of the `/app` folder (not shown in the listing above) which we'll touch on in later sections. These include: `angular.json`, `prerendered-routes.txt`, `ngsw-config.json` and `tailwind.config.js`.

| **:brain: Design decision** |
| :-- |
| For our Angular app code (within `app/src/app`) we prefer a flat folder structure, with top-level **"feature"** folders and a single **`shared`** folder. |

## [`app`] Feature folder structure

| **:white_check_mark: Pattern** |
| :-- |
| We highly recommend separating the code within the top-level feature folders into the following subfolders: **`data`**, **`feature`**, **`ui`** and **`util`**. And trying to keep these at one hierarchical level. We've found that this is a great starting folder structure (and general architecture) which helps you quickly find stuff, whilst spending minimal time on figuring out what goes where. |

The `data` folder is for (most) state management and data access services. Page and smart components go in the `feature` folder, whilst presentational components go in the `ui`folder. And the `util` folder is for standalone utilities.

This is a recommended folder structure based on [Nx's suggested library types](https://nx.dev/concepts/more-concepts/library-types).

For features within the `shared` folder you should follow the same structure, except you probably won't need a `feature` subfolder within each shared feature since these are shared bits of code for use elsewhere.

As things grow you may need to adapt and tweak this structure (e.g. to add another level in the hierarchy) — we show you how to tackle this in the [advanced example app](TODO).

## [`app`] Static prerendered pages and dynamic pages only

| **:brain: Design decision** |
| :-- |
| Out of the box, we _don't_ use server-side rendering (SSR). We _do_ use prerendering for certain pages (configured explicitly), and everything else is fully dynamic (i.e. client-side only, with a minimal loader shell). |

Whilst Angular has very good [support for server-side rendering (SSR)](https://angular.dev/guide/ssr) we don't make use of this in the _deployed app_ as we want to be able to run the app wholly from static assets (i.e. no dynamic server required to render any pages).

Instead, we do make use of [build-time prerendering](https://angular.dev/guide/prerendering) for routes we explicitly specify in [`app/prerendered-routes.txt`](./app/prerendered-routes.txt) (currently the website home and about pages) — a static HTML file is built and served for each path specified there (with some additional Firebase Hosting and PWA configuration).

And then everything else in the app is fully dynamic (i.e. rendered on the client) — a special empty "loader" HTML file (prerendered from the [`LoaderShellComponent`](./app/src/app/loader-shell.component.ts)) is served for all these routes, and we've configured Firebase Hosting and the PWA set-up to serve this loader file for these routes (more details below).

## [`app`] The prerendering set-up

For the build-time prerendering of pages, we:

- Configure the `prerender` option in `angular.json` to prerender all paths defined in the [`app/prerendered-routes.txt`](./app/prerendered-routes.txt) file.
  - We also set `"discoverRoutes": false` so only the routes we explicitly specify are prerendered.
- Specify the `/loader` path in the `prerendered-routes.txt` file, so that the loader shell is prerendered too.
  - The `/loader` route serves an empty shell of the app (using the [`LoaderShellComponent`](./app/src/app/loader-shell.component.ts)), which then loads the full app on the client-side. This route is defined in the [`app.routes.ts`](./app/src/app/app.routes.ts) file.
  - This is used as the default HTML file to serve for all fully dynamic parts of the app.

So, when we run the production build (`pnpm build`) Angular will output static HTML files for the prerendered routes and an HTML file for the loader shell (as well as the usual JavaScript, CSS, etc. assets)

> [!NOTE]
>
> If you want to add another static website page (or other prerendered route) follow the relevant "how-to" guide in the [`README`](./README.md).

## Firebase Hosting and PWA set-up

Given we have a mix of prerendered static and fully dynamic pages, we have to configure Firebase Hosting to serve the right HTML file for the right path, and also configure the PWA set up for proper caching and default index template serving.

> [!IMPORTANT]
>
> In a typical single-page app (SPA) without any server side rendering or static page generation, you'd serve a static `index.html` file for all paths requested. This file would usually contain very little UI, and then bootstrap the app and handle routing, data fetching, templating, etc. on the client-side (all handled by your framework).
>
> However, in our case, the `index.html` file is now the static (prerendered) website home page (which still bootstraps the Angular app when it loads client-side), which we wouldn't want to serve for all routes in our app as it contains content for the home page. And we have a mix of static pages and fully dynamic pages that need to work regardless of whether they are requested directly (from the "server" — a static host, Firebase Hosting, in our case) or within the single-page app (client-side). Hence the need for the loader shell and the Firebase Hosting and PWA set-up.

For the static pages (prerendered), we:

- Explicitly define these paths in the [`app/prerendered-routes.txt`](./app/prerendered-routes.txt) file — these tell Angular to build static HTML files for these paths only.
- Add an entry in the [`firebase/firebase.json`](./firebase/firebase.json) file (under the `hosting.rewrites` key) to serve the relevant prerendered HTML file for each path.
  - E.g. `index.html` for the website home page.
- Also want to make sure these paths are never prefetched or cached by the PWA service worker (because we always want to get the fresh content for these pages), so we add an exclusion for each in the [`app/ngsw-config.json`](./app/ngsw-config.json) file (under the `navigationUrls` key).
  - For the two static pages provided in the base template, the entries are: `"!/$", "!/about"`.

Then, for the rest of the fully dynamic pages, we:

- Add an entry in the [`firebase/firebase.json`](./firebase/firebase.json) file (under the `hosting.rewrites` key) to serve the `/loader` path (the default loader shell, mentioned previously) for all paths that aren't explicitly covered by the static pages.
  - This is known as a "catch-all" rule, and MUST be the last item in the list of rewrite rules.
- Configure the PWA service worker (in the [`app/ngsw-config.json`](./app/ngsw-config.json) file) to use the `"/loader/index.html"` path as the default "index" file to serve for all paths not covered by those defined in the `navigationUrls` key.
  - In this same file, we also add `"/loader/index.html"` to the list of prefetched URLs so it can be cached by the service worker.

Note also: in the [`firebase/firebase.json`](./firebase/firebase.json) file (under the `hosting` key) we set `"cleanUrls": true` and `"trailingSlash": false` to normalize the behavior and ensure our static paths are served correctly.

Collectively, this allows us to seamlessly serve the right HTML file for the right path, whether it's a static page or a fully dynamic page, and ensures that the PWA service worker doesn't cache the static pages.

## [`firebase`] Firebase Hosting caching headers

Whilst on the topic of Firebase Hosting, we also set up some caching headers in the [`firebase/firebase.json`](./firebase/firebase.json) file (under the `hosting.headers` key) to ensure that certain assets are cached for a long time (e.g. images, fonts, etc.) and others are not cached at all (e.g. the service worker files and everything else).

## [`app`] Progressive web app (PWA) set-up

| **:brain: Design decision** |
| :-- |
| We use Angular's PWA capabilities, mainly the [service worker support](https://angular.dev/ecosystem/service-workers), and provide a basic PWA set-up out of the box, with a manifest, caching, icons and a simple in-app update notification.<br><br>Once the app is loaded on a user's device (via the web browser, or from the home screen / app launcher) any new updates are downloaded behind the scenes and the user is informed when there's an update. |

The core of a PWA config is the [`manifest.webmanifest`](./app/src/manifest.webmanifest) file, which defines the app's name, icons, colors, etc. This is used by the browser to provide a more "app-like" experience when the user adds the app to their home screen / app launcher (depending on device capabilities). **You'll need to customize this file to specify your app's name and branding.**

For the Angular service worker, the [`app/ngsw-config.json`](./app/ngsw-config.json) file is the main configuration, determining how to cache assets, handle updates, etc.

The [`app/src/app/app.component.ts`](./app/src/app/app.component.ts) file contains the logic for the in-app update notification, which checks for updates to the app and prompts the user to reload when a new version is available.

> [!NOTE]
>
> Technically, a new "version" of an app is just a new build of assets, as defined by the `assetGroups` in the `ngsw-config.json` file. The service worker will automatically download (and cache) these new assets in the background and the trigger the in-app update notification.

## [`app`] UI components and styling using Angular Material and Tailwind CSS

| **:brain: Design decision** |
| :-- |
| We use [Angular Material](https://material.angular.io/) for UI components, and [Tailwind CSS](https://tailwindcss.com/) for styling. You can still create your own UI components or add in other libraries, if needed. You can also customize Tailwind CSS as you wish. |

The [`app/src/styles.scss`](./app/src/styles.scss) file sets up both Angular Material (with a basic theme) and Tailwind CSS styling. Here, we also provide styling overrides to make Angular Material work okay with the Tailwind CSS base styles.

> [!NOTE]
>
> We scope all Tailwind CSS and custom styles within the `#app` selector — we apply the `app` ID on the `<body>` element in the [`app/src/index.html`](./app/src/index.html) file and configure `tailwind.config.js` to place all Tailwind-specific styles within the `#app` selector, acting as a "namespace". When adding styles to the `styles.scss` file make sure to add them within the `#app` selector (already defined) to stick to this namespaced approach. This will hopefully allow for better overrides as you will have more specificity in your custom styles.

You can import and use Angular Material components within your components as usual (see the [docs](https://material.angular.io/)). And you can use Tailwind CSS classes in your HTML and SCSS files as you wish (see the [docs](https://tailwindcss.com/docs)).

## [`app`] State management using NgRx Signals

| **:brain: Design decision** |
| :-- |
| We use [NgRx SignalStore](https://ngrx.io/guide/signals/signal-store) for all state management (outside of components) in the Angular app. |

State management is a bit of a hot topic in the Angular community, and there are many ways (and libraries) to do it. One of the opinionated choices made as part of this curated tech stack is the use of [NgRx SignalStore](https://ngrx.io/guide/signals/signal-store) for all state management (outside of components). SignalStore is very well-designed and works hand-in-hand with [Angular's Signals system](https://angular.dev/guide/signals).

> [!TIP]
>
> The [NgRx docs](https://ngrx.io/guide/store/why) do a fantastic job of explaining why you would want to use a library like NgRx to manage state. The linked page covers the older (but still relevant) NgRx Store, but the principles are still applicable to SignalStore. Note that SignalStore is more lightweight and does not follow the Redux pattern, making it a bit simpler to use.

The base template uses SignalStore for the provided global auth store as well as the component-specific login flow store. We cover stores (and state management) in more detail in the [example apps](TODO).

## [`app`] Accessing Firebase services from the Angular app

| **:brain: Design decision** |
| :-- |
| We provide wrappers within the [`app/src/app/shared/firebase/`](./app/src/app/shared/firebase/) folders for accessing the various Firebase services from your Angular components, directives, services, etc. These are registered as global injectables so we can use Angular's dependency injection. |

The following special injection functions are provided for you to inject into your components, services, etc. to access the various Firebase services:

- `injectAuth()` — for the Firebase Authentication service.
- `injectFirestore()` — for the Firestore service.
- `injectRtdb()` — for the Realtime Database service.
- `injectStorage()` — for the Firebase Storage service.
- `injectFunctions()` — for the Firebase Functions service.

These return the underlying Firebase service instances provided by the Firebase JavaScript SDK.

> [!TIP]
>
> The base template comes with [`rxfire`](https://github.com/FirebaseExtended/rxfire) installed in the app's dependencies. This is a third-party library that provides a set of functions that bridge the gap between the Firebase JavaScript SDK and RxJS Observables. It's a great way to work with Firebase services in a more reactive way.
>
> You can pass in the Firebase service instance returned from the aforementioned injection functions to the `rxfire` functions.

## [`app`] Authentication and login flow

| **:brain: Design decision** |
| :-- |
| We use [Firebase Authentication](https://firebase.google.com/products/auth) for all authentication and login functionality, and provide a [passwordless login](https://firebase.google.com/docs/auth/web/email-link-auth) flow out of the box. |

A critical component of any app that provides user-specific capabilities is authentication. The base template comes with an auth store, auth guard, login page, passwordless login flow and logout flow out of the box.

To use the auth store: inject the global `AuthStore` service into your component, service, directive, etc. using `inject(AuthStore)`. You then have access to the state of the auth store. Note that this auth store automatically connects to Firebase Authentication and listens for changes, when your app starts up.

To use the auth guard:

- For a route that requires a logged-in user: add `canMatch: [authGuard('authed')]` to your route definition.
  - When a user is not logged in, they will be redirected to the login page, and taken back to the previous page after logging in.
- For a route that requires that no user is logged in: add `canMatch: [authGuard('not-authed')]` to your route definition.
  - When a user is logged in, they will be redirected to the home page.
  - Note that you probably won't need this — it's currently used for the `/login` route as we don't want already logged in users to access the login page.

For fully public pages, don't use the auth guard.

To try out the login flow run the app locally and click on the "Login" button.

> [!TIP]
>
> For local development, when you perform the login flow, you can get the special login link from the Firebase emulator log output (from the terminal output where you ran `pnpm dev` for the firebase folder) — no emails are actually sent from local development!

> [!NOTE]
>
> Firebase Authentication does not provide server-side sessions, which is not a problem for us as we don't use server-side rendering (SSR), and for any server-side functionality we use Firebase Functions (which has access to the auth token in each request). All authentication is carried out and managed client-side using the Firebase JavaScript SDK.
>
> This does mean that in the auth guard we need a check to see if we're running server-side (currently only applicable to local development and running the build process), where we then "redirect" to the special `/loader` route (covered in a previous section). Note that this isn't a proper redirect, just something that happens purely server-side to determine what content gets rendered for that route (so it doesn’t actually change the path the user is requesting). Once the page loads in the browser then the usual client-side auth check takes over when the Angular app hydrates (i.e. fully loads up).

## [`app`] Logging

| **:brain: Design decision** |
| :-- |
| We provide a simple logger utility in [`app/src/app/shared/logger.ts`](./app/src/app/shared/logger.ts), which uses [consola](https://github.com/unjs/consola) under the hood. |

During development, and even in production, it's useful to log errors, messages and data to the console to inspect the running state of the app and debug potential issues.

Use the logger utility to create a logger instance for every file in which you need to perform logging. E.g. `const logger = createLogger('MyComponent');` — this prepends the logging output with `"MyComponent"`.

> [!IMPORTANT]
>
> The logging level is configured in the relevant environment config file. For example, for local development the log level is set to `5` in the [`app/src/environments/environment.ts`](./app/src/environments/environment.ts) file, whilst it's set to `0` (i.e. only fatal and errors) in the live environment.
>
> See <https://unjs.io/packages/consola#log-level> for the different log levels.
>
> We suppress ALL logging in tests by default, to prevent noisy test output, but you can enable it by changing the log level in the test environment config file ([`app/src/environments/environment.test.ts`](app/src/environments/environment.test.ts)).

## [`app`] Test suites

| **:brain: Design decision** |
| :-- |
| We use [ng-mocks](https://ng-mocks.sudo.eu/) across most of the app test suites, to simplify boilerplate and mock out dependencies. |

The Angular test suites use the default Jasmine and Karma set-up that comes with an app generated by the Angular CLI.

We encourage use of [ng-mocks](https://ng-mocks.sudo.eu/) to simplify a lot of the boilerplate that comes with writing tests for Angular components, services, directives, etc, and to mock out dependencies in an easier way. Though feel free to avoid it in cases where it doesn't add value (but try to keep things consistent in usage).

Most of the components, services, etc. provided in the base template have corresponding test suites.

> [!TIP]
>
> We cover testing in more detail in the [example apps](TODO).

## [`app`] Linting using ESLint and formatting using Prettier

| **:brain: Design decision** |
| :-- |
| We use [ESLint](https://eslint.org/) for linting and [Prettier](https://prettier.io/) for code formatting.<br><br>Running `pnpm lint` performs the linting, and all Prettier formatting is carried out within VS Code (e.g. when you save a file). |

The config for linting is in [`app/.eslintrc.json`](./app/.eslintrc.json) and for formatting in [`app/.prettierrc`](./app/.prettierrc).

We also integrate [`prettier-plugin-tailwindcss`](https://www.npmjs.com/package/prettier-plugin-tailwindcss) to format Tailwind CSS classes in your HTML and JavaScript files.

## [`firebase`] Folder structure

Here are the main folders and files for the backend (some left out for brevity):

```text
firebase
└─ common
   └─ {shared types, interfaces, utility functions, etc.}
└─ dist
   └─ {compiled app code goes here - gitignored}
└─ functions
   └─ src
      └─ {your functions folders and code}
      └─ index.ts
    └─ package.json
    └─ tsconfig.json
└─ local
   └─ {local emulator data persistence - gitignored}
└─ test
    └─ {mainly security rules tests}
└─ database.rules.json
└─ firebase.json
└─ firestore.indexes.json
└─ firestore.rules
└─ storage.rules
```

We'll refer to these in the rest of the document.

| **:brain: Design decision** |
| :-- |
| Whilst, typically, projects that use Firebase mix the output of `firebase init` in the same folder as the frontend app, we've chosen to separate ALL Firebase bits out into a dedicated folder — [`firebase`](./firebase/) — with no shared dependencies. We also add a place to put common code [`firebase/common`](./firebase/common/) that the app can import from. |

## [`firebase`] Firebase Functions

| **:brain: Design decision** |
| :-- |
| We use [Firebase Functions](https://firebase.google.com/docs/functions) for all backend code, and write these in TypeScript.<br><br>Currently, we don't provide an opinionated set-up for how to write and organize your functions code — you can do this however you want. |

All your Firebase Functions should be exported within the [`firebase/functions/src/index.ts`](./firebase/functions/src/index.ts) file (this is a Firebase Functions requirement).

We do recommend splitting out the actual functions into separate files within the `firebase/functions/src` folder, and then importing and exporting them from within the `index.ts` file.

> [!IMPORTANT]
>
> Make sure you go through the [Firebase Functions docs](https://firebase.google.com/docs/functions) to understand how to write functions and what you can do with them. Also make sure you understand the costs and operational model of Firebase Functions.

> [!TIP]
>
> We make use of Firebase Functions extensively in the [advanced example app](TODO).

## [`firebase`] Security rules

The base template comes with all security rules — for Firestore, Realtime Database and Storage — set to block all access by default. This is the most secure setting. As you build out your app you'll need to update these rules to allow the necessary access.

The relevant security rules files are:

- [`firebase/firestore.rules`](./firebase/firestore.rules) for Firestore.
- [`firebase/database.rules.json`](./firebase/database.rules.json) Realtime Database.
- [`firebase/storage.rules`](./firebase/storage.rules) for Storage.

We also have some test suites set up to test out your security rules — see the [`firebase/test`](./firebase/test/) folder.

> [!IMPORTANT]
>
> Make sure you go through the [Firebase Security Rules docs](https://firebase.google.com/docs/rules) to understand how to write rules and what you can do with them.

> [!NOTE]
>
> We highly recommend having comprehensive test coverage of your security rules, as they are the gatekeepers to your backend and insecure rules can cause data leakage and other security issues.

## [`firebase`] Test suites

| **:brain: Design decision** |
| :-- |
| We use the Firebase Local Emulator Suite to test security rules locally and provide some test suites ready for testing out your security rules.<br><br>You can also write unit and integration tests for any other code within the `firebase` folder, including Firebase Functions.<br><br> We use [Vitest](https://vitest.dev/) as the testing framework. |

See the files within the [`firebase/test`](./firebase/test/) folder for the security rules test suites.

> [!NOTE]
>
> You can add any additional tests you want in this folder — Vitest will pick these up as long as they contain ".test." or ".spec." in their filename.

> [!TIP]
>
> We cover more Firebase testing, such as functions testing and integration testing, in the [advanced example app](TODO).

## [`firebase`] Linting using ESLint and formatting using Prettier

| **:brain: Design decision** |
| :-- |
| We use [ESLint](https://eslint.org/) for linting and [Prettier](https://prettier.io/) for code formatting.<br><br>Running `pnpm lint` performs the linting, and all Prettier formatting is carried out within VS Code (e.g. when you save a file). |

The config for linting is in [`firebase/.eslintrc.js`](./firebase/.eslintrc.js) and for formatting in [`firebase/.prettierrc`](./firebase/.prettierrc).

## Continuous integration (CI) using GitHub Actions

| **:brain: Design decision** |
| :-- |
| We provide a basic GitHub Actions pipeline ([`.github/workflows/ci.yml`](./.github/workflows/ci.yml)) that runs linting, tests and builds for both the app and firebase parts.<br><br> This pipeline is configured to run on every pull request commit and on commits pushed to the `main` branch. |

## Managing and monitoring Firebase services (including costs)

Use the [Firebase Console](https://console.firebase.google.com/) to manage and monitor your Firebase services.

> [!IMPORTANT]
>
> Since Firebase is a pay-as-you-go service, it's important to keep an eye on your usage and costs. You can set up budget alerts in the Firebase console to notify you when you're approaching certain thresholds.

> [!CAUTION]
>
> Firebase currently doesn't have a way to set a hard limit on costs, so you need to be vigilant about monitoring your usage and costs, and how you build features to make sure of Firebase services. Ultimately, you are responsible for the costs incurred by your use of services like Firebase.
>
> We cover some strategies for managing costs in the [advanced example app](TODO).
