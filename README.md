# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

![Logo](./assets/react-from-scratch@1x.png)
# React from scratch

A React boilerplate repo using Webpack 4, Babel, Eslint and Prettier. The repo was created for [this](https://medium.com/@adamramberg/setting-up-a-react-app-from-scratch-42521a118b10) blog post on [Medium]((https://medium.com)).


## Instalation

[ ] Clone the repo and type the following commands to run the app:

```
https://github.com/ranggaprima/coding_collective_skill_test.git

```

[ ] Open console or command prompt

[ ] Install node package manager

```
    npm install or yarn install

    if encounter a problem error or deprecated

    Running the following command

    [ ] npm cache clean --force
    [ ] npm install --force
```


## Usage

```
npm start

or

yarn start
```

## Open Browser

```
localhost:5173
```
