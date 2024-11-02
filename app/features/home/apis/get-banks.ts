import HttpServer from '@/libs/http-server'
import { banksSchema } from '@/schemas/home'
import { wait } from '@/utils'

export const getBanks = async () => {
  return wait(4_000).then(async () => {
    try {
      const { data } = await HttpServer().get('/banks')
      return banksSchema.parse(data)
    } catch (err) {
      throw new Error('Failed to fetch payment methods')
    }
  })
}
