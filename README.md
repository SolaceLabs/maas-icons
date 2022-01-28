# maas-icons

> Solace Icons library

[![NPM](https://img.shields.io/npm/v/maas-icons.svg)](https://www.npmjs.com/package/maas-icons) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Setup npm registry

Before installing the package this step needs to be completed.

You can authenticate to GitHub Packages with npm by creating a npmrc file in your root directory.

```

@SolaceDev:registry=https://npm.pkg.github.com

//npm.pkg.github.com/:_authToken=GITHUB_TOKEN

```

GITHUB_TOKEN needs to be replaced by user specific github token. Make sure the package permissions ( write:packages, read:packages ) are correctly selected during token creation, and SSO is also enabled.

See this [link](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) to see how to create github token. Read more about [packages](https://docs.github.com/en/packages/learn-github-packages/about-permissions-for-github-packages) permissions.

## Install

```bash
npm install --save @SolaceDev/maas-icons
```

## Usage
Import the svg sprite file to top level of the application.

```tsx
import React, { Component } from 'react'

import { ReactComponent as SolaceSvgs } from from '@SolaceDev/maas-icons/dist/svg/sprite.symbol.svg"'
import 'maas-icons/dist/index.css'

const App = () => {
  return (
      <div style={{ display: "none" }}>
        <SolaceSvgs />
        <OtherComponents>
      </div>
  );
};
```

## Development
**Note for developers** : Don't forget to include one of the following values in a commit, before pushing your branch to master. This would trigger a automated package version update.

| Value | Defintition                                                               |
| ----- | ------------------------------------------------------------------------- |
| major | MAJOR version when you make incompatible API changes                      |
| minor | MINOR version when you add functionality in a backwards compatible manner |
| patch | PATCH version when you make backwards compatible bug fixes                |

[Semantic Versioning](https://semver.org/)

## License

MIT © [](https://github.com/)
