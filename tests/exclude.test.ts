import type { ComponentResolverObject } from 'unplugin-vue-components'
import { describe, expect, it } from 'vitest'

import { AntdvNextXResolver } from '../src'

describe('antdvNextXResolver exclude', () => {
  it('component name matching string rule should not be resolved', async () => {
    const resolver = AntdvNextXResolver({ exclude: 'AxBubble' }) as ComponentResolverObject
    expect(resolver.resolve('AxBubble')).toBeFalsy()
  })

  it('component name matching RegExp rule should not be resolved', async () => {
    const resolver = AntdvNextXResolver({ exclude: /^AxBubble/ }) as ComponentResolverObject
    expect(resolver.resolve('AxBubble')).toBeFalsy()
    expect(resolver.resolve('AxBubbleList')).toBeFalsy()
    expect(resolver.resolve('AxBubbleDivider')).toBeFalsy()
  })

  it('component name matching Array<string | RegExp> rule should not be resolved', async () => {
    const resolver = AntdvNextXResolver({ exclude: ['AxSender', /^AxBubble/] }) as ComponentResolverObject
    expect(resolver.resolve('AxSender')).toBeFalsy()
    expect(resolver.resolve('AxBubble')).toBeFalsy()
    expect(resolver.resolve('AxBubbleList')).toBeFalsy()
    expect(resolver.resolve('AxBubbleDivider')).toBeFalsy()
  })

  it('should still resolve components that do not match the exclude rule', async () => {
    const resolver = AntdvNextXResolver({ exclude: /^AxBubble/ }) as ComponentResolverObject
    expect(resolver.resolve('AxWelcome')).toStrictEqual({ name: 'Welcome', from: '@antdv-next/x' })
  })
})
