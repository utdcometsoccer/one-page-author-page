import { describe, it, expect } from 'vitest'
import { getLocale } from '../src/utilities/getLocale'

describe('getLocale', () => {
  it('returns navigator.language in lowercase', () => {
    const original = Object.getOwnPropertyDescriptor(window.navigator, 'language')
    Object.defineProperty(window.navigator, 'language', { value: 'EN-US', configurable: true })
    expect(getLocale()).toBe('en-us')
    if (original) Object.defineProperty(window.navigator, 'language', original)
  })

  it('returns en-us if navigator.language is undefined', () => {
    const original = Object.getOwnPropertyDescriptor(window.navigator, 'language')
    Object.defineProperty(window.navigator, 'language', { value: undefined, configurable: true })
    expect(getLocale()).toBe('en-us')
    if (original) Object.defineProperty(window.navigator, 'language', original)
  })
})
