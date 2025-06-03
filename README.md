# Vueless Nuxt Module

## Quick Setup

1. Install Vueless Nuxt Module to your project.

```bash
npm i @vueless/nuxt
npx vueless init
```

2. Register `@vueless/nuxt` into the Nuxt config modules section in `nuxt.config.{ts,js}`

```js
export default defineNuxtConfig({
  modules: [
    '@vueless/nuxt'
  ],
  ...
})
```

3. Import Tailwind CSS and Vueless at the top of the main CSS file.

```scss
@import "tailwindcss";
@import "vueless";
```

That's it! You can now use Vueless in your Nuxt app ✨
