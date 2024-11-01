import HttpServer from '@/libs/http-server'
import { providersSchema } from '@/schemas/home'

export const getProviders = async () => {
  try {
    const { data } = await HttpServer().get('/providers/active')
    return providersSchema.parse(data)
  } catch (err) {
    throw new Error('Failed to fetch providers')
  }
}
