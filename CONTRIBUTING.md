# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [Code of Conduct](CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

If this is your first contribution to an open-source project on GitHub have a look at the [GitHub Docs](https://docs.github.com/en) specially the [Contributing to Projects](https://docs.github.com/en/get-started/quickstart/contributing-to-projects?tool=webui) guide.

### Blog

If you whish to write for the blog please read the [Blog Contributing Guide](apps/blog/CONTRIBUTING.md).

## How To Contribute

#### Branching Convention

Your branch name should be your initials (first letter of the your first and last name) folowed by `/contribution-subject`. For example, if your name is Rui Lopes and you are fixing a logo alignment, your branch name would be something like `rl/fix-logo`.

#### Security Bug Reports

If you encounter a security bug, please message us. **_Do not open an issue_**.

## Developing

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

## 🔗 References

You can use these resources to learn more about the technologies this project
uses.

- [Getting Started with npm](https://docs.npmjs.com/getting-started)
- [Turborepo Quickstart](https://turbo.build/repo/docs)