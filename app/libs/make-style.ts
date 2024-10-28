import { DesktopStyle } from '@/schemas/general'

const extractStyle = (styles: DesktopStyle) => {
  return {
    get<K extends keyof DesktopStyle>(key: K): DesktopStyle[K] {
      return styles[key]
    }
  }
}

export default extractStyle
