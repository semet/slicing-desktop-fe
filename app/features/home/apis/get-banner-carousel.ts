import HttpServer from '@/libs/http-server'
import { bannerSchema } from '@/schemas/home'

type Params = {
  language: string
  showCentral?: 'true' | 'false'
  currency?: string
}

export const getBannerCarousel = async (params: Params) => {
  const { language, showCentral, currency } = params
  try {
    const { data } = await HttpServer().get('/banners/active', {
      params: {
        language,
        type: 1,
        central: showCentral || 'false',
        sort: 'sequence:asc',
        currency
      }
    })
    return bannerSchema.parse(data)
  } catch (err) {
    throw new Error('Failed to fetch banner carousel')
  }
}