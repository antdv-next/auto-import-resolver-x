# Antdv-next X Auto Import Resolver

[English](./README.md) | 简体中文

[GitHub](https://github.com/antdv-next/auto-import-resolver-x) · [npm](https://www.npmjs.com/package/@antdv-next/x-auto-import-resolver)

`@antdv-next/x-auto-import-resolver` 是 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) 的一个解析器，用于实现 [@antdv-next/x](https://www.antdv-next.com/x) 组件的按需引入。

## 特性

- 支持 `Vite`, `Webpack`, `Rspack`, `Vue CLI`, `Rollup`, `esbuild` 等
- 自动引入 `@antdv-next/x` 注册的所有组件（`Ax` 前缀组件，例如 `AxBubble`、`AxSender`、`AxWelcome` 等）

## 安装

```shell
# via npm
npm i @antdv-next/x-auto-import-resolver unplugin-vue-components -D

# via yarn
yarn add @antdv-next/x-auto-import-resolver unplugin-vue-components -D

# via pnpm
pnpm add @antdv-next/x-auto-import-resolver unplugin-vue-components -D

# via Bun
bun add @antdv-next/x-auto-import-resolver unplugin-vue-components -D
```

## 使用

### Vite

```ts
// vite.config.ts
import { AntdvNextXResolver } from '@antdv-next/x-auto-import-resolver'
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
import { AntdvNextXResolver } from '@antdv-next/x-auto-import-resolver'
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
import { AntdvNextXResolver } from '@antdv-next/x-auto-import-resolver'
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
import { AntdvNextXResolver } from '@antdv-next/x-auto-import-resolver'
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
import { AntdvNextXResolver } from '@antdv-next/x-auto-import-resolver'
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
import { AntdvNextXResolver } from '@antdv-next/x-auto-import-resolver'
import Components from 'unplugin-vue-components/esbuild'

build({
  plugins: [
    Components({
      resolvers: [AntdvNextXResolver()],
    }),
  ],
})
```

### 配合 `@antdv-next/auto-import-resolver` 使用

`@antdv-next/x` 基于 `antdv-next` 构建。如果你同时使用 `antdv-next` 组件以及
`@antdv-next/icons` 图标，可以同时注册两个解析器：

```ts
import { AntdvNextResolver } from '@antdv-next/auto-import-resolver'
import { AntdvNextXResolver } from '@antdv-next/x-auto-import-resolver'
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

## 选项

### exclude

设置不自动引入的组件。

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

## 组件

`@antdv-next/x` 注册的所有组件均被支持（共 27 个）：

| 全局名 | 导出名 |
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

## 许可证

[MIT](./LICENSE) © 2026-present [antdv-next](https://github.com/antdv-next)
