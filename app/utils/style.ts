import { DesktopStyle } from '@/schemas/general'

export const extractStyle = (styles: DesktopStyle) => {
  return {
    get<K extends keyof DesktopStyle>(key: K): DesktopStyle[K] {
      return styles[key]
    }
  }
}

export const convertHex = (hex: string) => {
  const parsed = hex
    ?.replace(
      /^#?([\da-f])([\da-f])([\da-f])$/i,
      (m, r, g, b) => '#' + r + r + g + g + b + b
    )
    .slice(1)
    .match(/.{2}/g)
    ?.map((x) => Number.parseInt(x, 16)) as [number, number, number] | null

  const rgbValue = `rgb(${parsed?.join(', ')})`
  return {
    withOpacity(opacity: string) {
      return `rgba(${parsed?.join(', ')} ${opacity ? `, ${Number.parseInt(opacity) / 100}` : ''})`.toString()
    },
    toRgb() {
      return rgbValue.toString()
    }
  }
}
