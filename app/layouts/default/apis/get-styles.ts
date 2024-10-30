import HttpServer from '@/libs/http-server'
import { styleSchema } from '@/schemas/general'

export const getStyleRequest = async () => {
  try {
    const { data } = await HttpServer().get('/themes/active/style_options')
    return styleSchema.parse(data)
  } catch {
    throw new Error('Failed to fetch style options')
  }
}
