import HttpServer from '@/libs/http-server'
import { webSettingsSchema } from '@/schemas/general'

export const getWebSettingsRequest = async () => {
  try {
    const { data } = await HttpServer().get('/web/settings')
    return webSettingsSchema.parse(data)
  } catch {
    throw new Error('Failed to fetch web settings')
  }
}
