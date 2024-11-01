import HttpServer from '@/libs/http-server'
import { lastPlayedSchema } from '@/schemas/home'

export const getLastPlayedGames = async () => {
  try {
    const { data } = await HttpServer().get('/games/played')
    return lastPlayedSchema.parse(data)
  } catch (err) {
    throw new Error('Failed to fetch last played games')
  }
}
