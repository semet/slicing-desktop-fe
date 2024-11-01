import HttpServer from '@/libs/http-server'
import { favoriteGameSchema } from '@/schemas/home'
import { TParamsWithToken } from '@/types'

type Params = TParamsWithToken

export const getFavoriteGames = async (params: Params) => {
  const { accessToken } = params

  try {
    const { data } = await HttpServer(accessToken).get('/game-favorites', {
      params: {
        game_status: 1
      }
    })
    return favoriteGameSchema.parse(data)
  } catch (err) {
    throw new Error('Failed to fetch favorite games')
  }
}
