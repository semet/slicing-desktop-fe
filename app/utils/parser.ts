export const parseLanguageFromHeaders = (headers: Headers) => {
  const language = headers
    .get('Accept-Language')
    ?.split(',')
    .map((lang) => (lang.includes('-') ? lang.split('-')[0] : lang))[0]
  return language
}

export const extractCookieFromHeaders = (headers: Headers, name: string) => {
  const cookie = headers
    .get('Cookie')
    ?.split(';')
    .find((cookie) => cookie.includes(name))
    ?.split('=')[1]
    .trim()
  return cookie
}
