<p align="center">
  <img src="./docs/logo.png" width="350">
</p>

# 

[![](https://img.shields.io/npm/dw/contreebutors.svg)](https://www.npmjs.com/package/contreebutors) 
[![](https://img.shields.io/npm/v/contreebutors.svg)](https://www.npmjs.com/package/contreebutors)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
![Build](https://github.com/doitadrian/contreebutors/workflows/Build/badge.svg)

## Install
```
npm install contreebutors --save-dev
```

Or if you prefer yarn: 
```
yarn add contreebutors --dev
```

## CLI

The following will create a `contreebutors.json` file in the current working directory, and render the list of contributors at the end of your `README.md` file:

```
contreebutors add --username doitadrian
```

Note that the command doesn't perform any Git commits.

## Code

You can also use the `Contreebutors` class and execute commands via code. This might be useful if you're trying to include the library in your CI/CD pipeline.

```ts
import { Contreebutors } from "contreebutors";

(...)

const contreebutors = new Contreebutors();
await contreebutors.add({ username: "doitadrian"});
```

Again, this will only make the changes to the files. No Git commits will be performed.

## GitHub Action

GitHub action is on the way. 😊