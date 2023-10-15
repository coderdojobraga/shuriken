<h1 align="center">shuriken</h1>
<div align="center">
  <img height="120" src="apps/app/public/koi/star.png" />
</div>
<br />
<div align="center">
  <strong>
    Frontend platform for managing session registrations and recording ninjas' progress
  </strong>
</div>
<br />
<div align="center">

  [![Actions Status](https://github.com/coderdojobraga/shuriken/workflows/CI/badge.svg)](https://github.com/coderdojobraga/shuriken/actions)
  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
  ![GitHub contributors](https://img.shields.io/github/contributors-anon/coderdojobraga/shuriken)
  ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/coderdojobraga/shuriken)

</div>

## 🗃️ What's Inside?

This turborepo uses [npm](https://www.npmjs.com/) as a package manager. It includes the following packages/apps:

### Apps

- `app`: a [Next.js](https://nextjs.org) app
- `blog`: a [Next.js](https://nextjs.org) app
- `web`: another [Next.js](https://nextjs.org) app

### Packages

- `ui`: a stub React component library shared by both `web` and `blog` applications
- `eslint-config-coderdojobraga`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## 💻 Developing

### Build

To build all apps and packages, run the following command:

```
npm run build
```

### Develop

To develop all apps and packages, run the following command:

```
npm run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
```
## 🤝 Contributing

When contributing to this repository, please first discuss the change you wish to make via discussions, issues, email, or any other method with the owners of this repository.

Please note we have a [Code of Conduct](CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

We have a [Contributing Guide](CONTRIBUTING.md) to help you getting started.

If you want to write for our blog we also have a [Blog Contributing Guide](apps/blog/CONTRIBUTING.md).

## 🔗 Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
- [Caching](https://turborepo.org/docs/core-concepts/caching)
- [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
