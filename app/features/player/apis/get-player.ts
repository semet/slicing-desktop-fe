import { decodeJwt } from 'jose'

import HttpServer from '@/libs/http-server'
import { TParamsWithToken } from '@/types'

type Params = TParamsWithToken

export const getPlayerRequest = async (params: Params) => {
  const { accessToken } = params
  const decodedToken = accessToken ? decodeJwt(accessToken) : undefined
  const playerId = decodedToken ? decodedToken.aud : undefined

  try {
    const { data } = await HttpServer(accessToken).get(`/players/${playerId}`)

    return data
  } catch (err) {
    throw new Error('Failed to get Player Data')
  }
}