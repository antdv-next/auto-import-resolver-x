import type { ComponentResolver } from 'unplugin-vue-components'
import componentMap from './components'

export interface AntdvNextXResolverOptions {
  /**
   * Set the components that do not require automatic import.
   *
   * @default []
   */
  exclude?: FilterPattern
}

export type FilterPattern = ReadonlyArray<string | RegExp> | string | RegExp | null

function isExclude(name: string, exclude?: FilterPattern): boolean {
  if (!exclude)
    return false

  if (typeof exclude === 'string')
    return name === exclude

  if (exclude instanceof RegExp)
    return !!name.match(exclude)

  if (Array.isArray(exclude)) {
    for (const item of exclude) {
      if (name === item || name.match(item))
        return true
    }
  }
  return false
}

/**
 * Resolver for [@antdv-next/x](https://www.antdv-next.com/x)
 *
 * Automatically import `@antdv-next/x` components on demand.
 *
 * Components registered by `@antdv-next/x` use the `Ax` prefix
 * (e.g. `AxBubble`, `AxSender`, `AxWelcome`, ...).
 *
 * For `@antdv-next/icons` icons, use `AntdvNextResolver({ resolveIcons: true })`
 * from `@antdv-next/auto-import-resolver` alongside this resolver.
 */
export function AntdvNextXResolver(options?: AntdvNextXResolverOptions): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      const opts = Object.assign({}, options)

      if (isExclude(name, opts.exclude)) {
        return
      }

      const importName = componentMap[name]
      if (importName) {
        if (isExclude(importName, opts.exclude)) {
          return
        }

        return {
          name: importName,
          from: '@antdv-next/x',
        }
      }
    },
  }
}
