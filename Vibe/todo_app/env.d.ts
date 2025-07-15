// env.d.ts
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare const __VUE_OPTIONS_API__: boolean
declare const __VUE_PROD_DEVTOOLS__: boolean