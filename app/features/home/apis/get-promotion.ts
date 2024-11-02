import HttpServer from '@/libs/http-server'
import { promotionSchema } from '@/schemas/home'
import { wait } from '@/utils'

type Params = {
  language: string
}

export const getPromotion = async (params: Params) => {
  const { language } = params
  return wait(4_000).then(async () => {
    try {
      const { data } = await HttpServer().get('/promotions/active', {
        params: {
          language
        }
      })
      return promotionSchema.parse(data)
    } catch (err) {
      throw new Error('Failed to fetch promotion')
    }
  })
}
