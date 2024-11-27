# Vite Express Starter

This monorepo contains a starter UI component library as well as a database package I can use to bootstrap full stack, micro-service based Typescript applications.

Any apps will go inside the `/apps` workspace, and import:

- UI components from the `@repo/design-system` package.
- Database schema and connection from the `@repo/db` package.
- Configuration files from the various `@repo` packages within `packages/`.

## SSR vs SPA

The new release of [React Router v7](https://reactrouter.com/home) provides native Server-Side Rendering
Support with support for React 19 as the UI layer. A sample app using our monorepo config is in the `apps/web-ssr` package.

You can also adopt the traditional SPA approach by adding React Router in
[SPA mode](https://reactrouter.com/start/library/) incrementally in the `apps/web` package for a more
traditional, client-rendered deployment with React, Vite and Nginx.

## Adding new APIs

Run `npm run add-api` from the project root.

This references the `apps/api` project and runs the Turborepo Generator found in
`turbo/generators/config.ts` for `api`.

- Any changes made to the `api` package that are project specific need to be reflected
in this Generator.
