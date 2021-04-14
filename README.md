[contributing]: CONTRIBUTING.md
[code_of_conduct]: CODE_OF_CONDUCT.md
[license]: LICENSE.txt
[vercel-status]: http://therealsujitk-vercel-badge.vercel.app/?app=coderdojo-braga
[deploy-url]: https://coderdojo-braga.vercel.app
[style-status]: https://github.com/coderdojobraga/shuriken/actions/workflows/style.yml/badge.svg
[style-workflow]: https://github.com/coderdojobraga/shuriken/actions/workflows/style.yml

# shuriken

> :star: **shuri**ken + bok**ken**

[![Vercel][vercel-status]][deploy-url]
[![CI Style][style-status]][style-workflow]

Platform support API for managing session registrations and recording ninjas'
progress.

## :rocket: Getting Started

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes.

### :inbox_tray: Prerequisites

The following software is required to be installed on your system:

- [Node.js 15.11+](https://nodejs.org/en/download/)

We recommend using [asdf version
manager](https://asdf-vm.com/#/core-manage-asdf?id=install) to install and
manage all the programming languages' requirements.

### :gear: Setup

First, clone & setup the repository:

```
git clone git@github.com:coderdojobraga/shuriken.git
cd shuriken
cp -n .env.sample .env.local
npm install
```

### :hammer: Development

Start the development server and open
[http://localhost:3000](http://localhost:3000) with your browser to see the
result.

```
npm run develop
```

Test your code against common guidelines.

```
npm run test
```

Lint your code.

```
npm run lint
```

Format your code.

```
npm run format
```

### :package: Deployment

Check out the [Next.js deployment
documentation](https://nextjs.org/docs/deployment) for more details.

### :link: References

You can use these resources to learn more about the technologies this project
uses.

- [Getting Started with React](https://reactjs.org/docs/getting-started.html)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js Documentation](https://nextjs.org/docs)

## :handshake: Contributing

Please read [CONTRIBUTING][contributing] and [CODE_OF_CONDUCT][code_of_conduct]
for details on our code of conduct and the process for submitting pull requests
to us.

## :memo: License

This project is licensed under the MIT License - see the [LICENSE][license]
file for details.
