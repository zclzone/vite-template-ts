declare type Recordable<T = any> = Record<string, T>
declare type ReadonlyRecordable<T = any> = { readonly [key: string]: T }

declare interface ViteEnv {
  VITE_PORT: number,
  VITE_PAGE_DIR: string
}