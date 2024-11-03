import HttpServer from '@/libs/http-server'
import { banksSchema } from '@/schemas/home'

export const getBanks = async () => {
  try {
    const { data } = await HttpServer().get('/banks')
    return banksSchema.parse(data)
  } catch (err) {
    throw new Error('Failed to fetch payment methods')
  }
}
