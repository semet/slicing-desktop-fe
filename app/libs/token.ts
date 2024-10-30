import { decodeJwt } from 'jose'
import Cookies from 'js-cookie'

export const generateTokenCookie = (params: {
  token: string
  remember: boolean
}) => {
  const { remember, token } = params

  const decodedToken = decodeJwt(token)
  const decodedTokenExp = decodedToken.exp

  const expirationDate =
    remember && decodedTokenExp ? new Date(decodedTokenExp * 1000) : undefined

  return `token=${token}; Path=/; SameSite=Lax; Expires=${expirationDate}`
}

export const generateToken2Cookie = (params: {
  token: string
  remember: boolean
}) => {
  const { remember, token } = params

  const oneYear = 365 * 24 * 60 * 60

  const expirationDate = remember ? oneYear : undefined

  return `token2=${token}; Path=/; SameSite=Lax; Expires=${expirationDate}`
}

export const generateRefreshTokenCookie = (params: {
  token: string
  remember: boolean
}) => {
  const { remember, token } = params

  const decodedToken = decodeJwt(token)
  const decodedTokenExp = decodedToken.exp

  const expirationDate =
    remember && decodedTokenExp ? new Date(decodedTokenExp * 1000) : undefined

  return `refreshToken=${token}; Path=/; SameSite=Lax; Expires=${expirationDate}`
}

export const checkIfTokenExpires = (token?: string): boolean => {
  if (!token) return true
  const decodedToken = decodeJwt(token)
  const decodedTokenExp = decodedToken.exp

  if (!decodedTokenExp) return false

  const now = new Date().getTime() / 1000

  return now > decodedTokenExp
}

export const withAccessToken = <P = object, T = unknown>(
  fn: (params: P & { accessToken: string }) => Promise<T>
) => {
  return async (params: P): Promise<T> => {
    const accessToken = Cookies.get('token')
    console.log('accessToken', accessToken)
    if (!accessToken) {
      throw new Error('Access token is missing')
    }
    return fn({ ...params, accessToken })
  }
}
