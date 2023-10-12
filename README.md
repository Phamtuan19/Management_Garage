# React + TypeScript + Vite

<br/>
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
<br/>
Currently, two official plugins are available:

<br/>

-  [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
   <br/>
-  [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
   <br/>

## Expanding the ESLint configuration

<br/>
If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:
<br/>
- Configure the top-level `parserOptions` property like this:
<br/>
```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```
<br/>
- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
<br/>
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
<br/>
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
<br/>
#   F E _ e l e a r n i n g 
 
 
