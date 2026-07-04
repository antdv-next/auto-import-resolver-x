import type { ComponentResolverObject } from 'unplugin-vue-components'
import { describe, expect, it } from 'vitest'

import { AntdvNextXResolver } from '../src'

describe('antdvNextXResolver components', () => {
  it('component name matching', async () => {
    const resolver = AntdvNextXResolver() as ComponentResolverObject
    expect(resolver.resolve('AxBubble')).toStrictEqual({ name: 'Bubble', from: '@antdv-next/x' })
    expect(resolver.resolve('AxSenderHeader')).toStrictEqual({ name: 'SenderHeader', from: '@antdv-next/x' })
    expect(resolver.resolve('AxProvider')).toStrictEqual({ name: 'XProvider', from: '@antdv-next/x' })
    expect(resolver.resolve('AxBubble2')).toBeFalsy()
  })
})
