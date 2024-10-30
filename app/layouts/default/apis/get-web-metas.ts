import HttpServer from '@/libs/http-server'
import { webMetasSchema } from '@/schemas/general'

export const getWebMetasRequest = async () => {
  try {
    const { data } = await HttpServer().get('/moneysite-metas')
    return webMetasSchema.parse(data)
  } catch {
    throw new Error('Failed to fetch web settings')
  }
}
