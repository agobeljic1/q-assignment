# React + TypeScript + Vite

The app was built on a system with node version 18.18.0. Install the app with `npm install` and then run `npm run dev` for a dev server. Navigate to `http://localhost:5173/` on default.

The app contains all of the functionalities mentioned in the task. Regarding the advanced patterns mentioned in the assignment file, I've used hoc for logging. Could've used maybe compund components or render props to add a wrapper for loading data for comments, posts and single post but didn't end up doing it that way. For comments and posts, infinite scroll is implemented. Emotion was used for styling, just for the sake of using something external for that. There are also github deployment actions but more on their implementation in a separate README. The app is deployed to the firebase server through github actions, every time to a different url and you can find the url in github actions tab for that particular instance. I previously asked some questions to the recruiter(Marta) on Saturday but to this day she didn't respond me(regarding the logger). That's why I implemented logger like this. If you've meant something else with this explanation, what can we do. I got notified about the task on Thursday and was pretty much finished after a two days but I was waiting on the input regarding the logger question and also at some point I realized there are paging capabilities on the jsonplaceholder, so I added that also with the infinite scroll. You can check the commit history for more details on that. Good luck :)

The application will automatically reload if you change any of the source files.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
