![vueless-cover.png](playground/assets/images/vueless-cover.png)

# Vueless Nuxt Module

[Vueless UI](https://github.com/vuelessjs/vueless) – a UI library with Open Architecture for Vue.js 3 and Nuxt.js 3 / 4, powered by [Storybook v9](https://storybook.js.org) and [Tailwind CSS v4](https://tailwindcss.com).

**With Vueless UI, you’re free to:**
- 🪄️ Customize any component
- 📋 Copy and extend existing ones
- 🧱 Build your own from scratch
- 📕 Document it all seamlessly in Storybook

[Documentation](https://docs.vueless.com/) | [UI Components](https://ui.vueless.com/) | [Website](http://vueless.com/)

### Key features

- 🧩 65+ crafted UI components (including range date picker, multi-select, and nested table)
- ✨ Open Architecture lets you customize, copy, extend, and create your own components
- 📕 Built-in Storybook support
- 🌈 Beautiful default UI theme
- 🌀 Unstyled mode
- 🌗 Light and dark mode
- 🧬 Design tokens powered by CSS variables
- ⚙️ Server-side rendering (SSR)
- 🌍 Internationalization (i18n)
- ♿️ Accessibility (a11y)
- 🖼️ Inline SVG icons
- 🪄 Auto component imports (as you use them)
- 🧿 Uncompiled source in npm for better DX
- 🧪️ 1300+ unit tests ensuring consistent logic
- 🛡️ Full TypeScript support with type safety

## Quick Start

1. Install Vueless Nuxt module.

```bash
npm install @vueless/nuxt
npx vueless init
```

2. Register `@vueless/nuxt` into the Nuxt config modules section.
```javascript
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

## Contributing

* We encourage you to contribute to Vueless! Please check out the
  [contributing to Vueless](CONTRIBUTING.md) for guidelines.
* Trying to report a possible security vulnerability in Vueless? Please
  check out our [security policy](SECURITY.md) for guidelines.
* Everyone interacting in Vueless and its sub-projects' codebases, issue trackers, chats, and mailing lists is expected to follow our [code of conduct](CODE_OF_CONDUCT.md) rules.

## License

Vueless is released under the [MIT License](https://opensource.org/licenses/MIT).

---
From Ukrainians to a Peaceful World 🇺🇦
