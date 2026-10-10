/// <reference types="vite/client" />
/// <reference types="vueless/modules" />

declare module '#build/vueless.config.mjs' {
  const config: import('vueless').Config
  export default config
}
