import HttpServer from '@/libs/http-server'
import { providersSchema } from '@/schemas/home'
import { handleError, wait } from '@/utils'

export const getProviders = async () => {
  return wait(4_000).then(async () => {
    try {
      const { data } = await HttpServer().get('/providers/active')
      return providersSchema.parse(data)
    } catch (error) {
      handleError(error)
    }
  })
}
