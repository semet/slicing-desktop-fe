import HttpServer from '@/libs/http-server'
import { providersSchema } from '@/schemas/home'
import { handleError } from '@/utils'

export const getProviders = async () => {
  try {
    const { data } = await HttpServer().get('/providers/active', {
      cache: 'force-cache'
    })
    return providersSchema.parse(data)
  } catch (error) {
    handleError(error)
  }
}
