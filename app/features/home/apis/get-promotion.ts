import HttpServer from '@/libs/http-server'
import { promotionSchema } from '@/schemas/home'

type Params = {
  language: string
}

export const getPromotion = async (params: Params) => {
  const { language } = params
  try {
    const { data } = await HttpServer().get('/promotions/active', {
      params: {
        language
      }
    })
    return promotionSchema.parse(data)
  } catch (err) {
    console.log(err?.response?.data)
    throw new Error('Failed to fetch promotion')
  }
}
