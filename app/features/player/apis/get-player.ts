import { decodeJwt } from 'jose'

import HttpServer from '@/libs/http-server'
import { playerSchema } from '@/schemas/player'
import { TParamsWithToken } from '@/types'
import { handleError } from '@/utils'

type Params = TParamsWithToken

export const getPlayerRequest = async (params: Params) => {
  const { accessToken } = params
  const decodedToken = accessToken ? decodeJwt(accessToken) : undefined
  const playerId = decodedToken ? decodedToken.aud : undefined

  try {
    const { data } = await HttpServer(accessToken).get(`/players/${playerId}`)
    return playerSchema.parse(data)
  } catch (err) {
    handleError(err)
  }
}
