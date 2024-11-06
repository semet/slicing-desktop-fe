import { createCookie } from '@remix-run/node'

import { userCredentialKeys } from '@/configs/cookies'

const { token, token2, refreshToken } = userCredentialKeys

export const tokenCookie = createCookie(token, {
  httpOnly: false,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  secrets: [process.env.COOKIE_SECRET || 'default-secret'],
  path: '/'
})

export const token2Cookie = createCookie(token2, {
  httpOnly: false,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  secrets: [process.env.COOKIE_SECRET || 'default-secret'],
  path: '/'
})

export const refreshTokenCookie = createCookie(refreshToken, {
  httpOnly: false,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  secrets: [process.env.COOKIE_SECRET || 'default-secret'],
  path: '/'
})
