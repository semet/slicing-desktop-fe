import { DesktopStyle } from '@/schemas/general'

const makeStyle = (styles: DesktopStyle) => {
  return {
    get<K extends keyof DesktopStyle>(key: K): DesktopStyle[K] {
      return styles[key]
    }
  }
}

export default makeStyle
