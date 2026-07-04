# Antdv-next X Auto Import Resolver

English | [简体中文](./README.zh-CN.md)

`@antdv-next/auto-import-resolver-x` is a resolver for [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) that enables on-demand importing of [@antdv-next/x](https://www.antdv-next.com/x) components.

## Features

- Supports `Vite`, `Webpack`, `Rspack`, `Vue CLI`, `Rollup`, `esbuild`, and more.
- Automatically imports every component registered by `@antdv-next/x` (the `Ax`-prefixed components, e.g. `AxBubble`, `AxSender`, `AxWelcome`, ...).

## Installation

```shell
# via npm
npm i @antdv-next/auto-import-resolver-x unplugin-vue-components -D

# via yarn
yarn add @antdv-next/auto-import-resolver-x unplugin-vue-components -D

# via pnpm
pnpm add @antdv-next/auto-import-resolver-x unplugin-vue-components -D

# via Bun
bun add @antdv-next/auto-import-resolver-x unplugin-vue-components -D
```

## Usage

### Vite

```ts
// vite.config.ts
import { AntdvNextXResolver } from '@antdv-next/auto-import-resolver-x'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [AntdvNextXResolver()],
    }),
  ],
})
```

### Rollup

```ts
// rollup.config.js
import { AntdvNextXResolver } from '@antdv-next/auto-import-resolver-x'
import Components from 'unplugin-vue-components/rollup'

export default {
  plugins: [
    Components({
      resolvers: [AntdvNextXResolver()],
    }),
  ],
}
```

### Webpack

```ts
// webpack.config.js
import { AntdvNextXResolver } from '@antdv-next/auto-import-resolver-x'
import Components from 'unplugin-vue-components/webpack'

module.exports = {
  plugins: [
    Components({
      resolvers: [AntdvNextXResolver()],
    }),
  ],
}
```

### Rspack

```ts
// rspack.config.js
import { AntdvNextXResolver } from '@antdv-next/auto-import-resolver-x'
import Components from 'unplugin-vue-components/rspack'

module.exports = {
  plugins: [
    Components({
      resolvers: [AntdvNextXResolver()],
    }),
  ],
}
```

### Vue CLI

```ts
// vue.config.js
import { AntdvNextXResolver } from '@antdv-next/auto-import-resolver-x'
import Components from 'unplugin-vue-components/webpack'

module.exports = {
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [AntdvNextXResolver()],
      }),
    ],
  },
}
```

### esbuild

```ts
// esbuild.config.js
import { AntdvNextXResolver } from '@antdv-next/auto-import-resolver-x'
import Components from 'unplugin-vue-components/esbuild'

build({
  plugins: [
    Components({
      resolvers: [AntdvNextXResolver()],
    }),
  ],
})
```

### With `@antdv-next/auto-import-resolver`

`@antdv-next/x` is built on top of `antdv-next`. If you also use `antdv-next`
components and `@antdv-next/icons` icons, register both resolvers together:

```ts
import { AntdvNextResolver } from '@antdv-next/auto-import-resolver'
import { AntdvNextXResolver } from '@antdv-next/auto-import-resolver-x'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [
        AntdvNextResolver({ resolveIcons: true }),
        AntdvNextXResolver(),
      ],
    }),
  ],
})
```

## Options

### exclude

Set the components that do not require automatic import.

- **Type:** `string | RegExp | Array<string | RegExp>`
- **Default:** `[]`
- **Example:**

```ts
Components({
  resolvers: [
    AntdvNextXResolver({
      exclude: ['AxBubble', /^AxSender[A-Z]/],
    }),
  ],
})
```

## Components

All components registered by `@antdv-next/x` are supported (27 in total):

| Global name | Import name |
| --- | --- |
| `AxActions` | `Actions` |
| `AxActionsAudio` | `ActionsAudio` |
| `AxActionsCopy` | `ActionsCopy` |
| `AxActionsFeedback` | `ActionsFeedback` |
| `AxActionsItem` | `ActionsItem` |
| `AxAttachments` | `Attachments` |
| `AxBubble` | `Bubble` |
| `AxBubbleDivider` | `BubbleDivider` |
| `AxBubbleList` | `BubbleList` |
| `AxBubbleSystem` | `BubbleSystem` |
| `AxCodeHighlighter` | `CodeHighlighter` |
| `AxConversations` | `Conversations` |
| `AxConversationsCreation` | `ConversationsCreation` |
| `AxFileCard` | `FileCard` |
| `AxFileCardList` | `FileCardList` |
| `AxMermaid` | `Mermaid` |
| `AxPrompts` | `Prompts` |
| `AxProvider` | `XProvider` |
| `AxSender` | `Sender` |
| `AxSenderHeader` | `SenderHeader` |
| `AxSenderSwitch` | `SenderSwitch` |
| `AxSources` | `Sources` |
| `AxSuggestion` | `Suggestion` |
| `AxThink` | `Think` |
| `AxThoughtChain` | `ThoughtChain` |
| `AxThoughtChainItem` | `ThoughtChainItem` |
| `AxWelcome` | `Welcome` |

## License

[MIT](./LICENSE) © 2026-present [antdv-next](https://github.com/antdv-next)
