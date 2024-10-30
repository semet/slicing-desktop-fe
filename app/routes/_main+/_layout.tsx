import { LoaderFunctionArgs } from '@remix-run/node'
import { json, Outlet, useRouteError } from '@remix-run/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import { generalKeys } from '@/factories/general'
import { playersKeys } from '@/factories/players'
import { getPlayerRequest } from '@/features/player'
import {
  DefaultLayout,
  getCaptchaRequest,
  getLanguageSettingsRequest,
  getStyleRequest,
  getWebMetasRequest,
  getWebSettingsRequest
} from '@/layouts/default'
import { checkIfTokenExpires } from '@/libs/token'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const browserDefaultLanguage = request.headers
    .get('Accept-Language')
    ?.split(',')[0]
  const headers = request.headers
  const accessToken = headers
    .get('Cookie')
    ?.split(';')
    .find((cookie) => cookie.includes('token'))
    ?.split('=')[1]
    .trim()
  const isTokenExpires = checkIfTokenExpires(accessToken)

  const queryClient = new QueryClient()

  if (accessToken && !isTokenExpires) {
    await queryClient.prefetchQuery({
      queryKey: playersKeys.player,
      queryFn: () => getPlayerRequest({ accessToken })
    })
  }

  await queryClient.prefetchQuery({
    queryKey: generalKeys.activeStyle,
    queryFn: getStyleRequest
  })

  await queryClient.prefetchQuery({
    queryKey: generalKeys.captcha,
    queryFn: () =>
      getCaptchaRequest({
        action: 'login'
      })
  })

  await queryClient.prefetchQuery({
    queryKey: generalKeys.webSettings,
    queryFn: getWebSettingsRequest
  })

  await queryClient.prefetchQuery({
    queryKey: generalKeys.webMeta,
    queryFn: getWebMetasRequest
  })

  await queryClient.prefetchQuery({
    queryKey: generalKeys.language,
    queryFn: () => getLanguageSettingsRequest({ lang: browserDefaultLanguage })
  })

  return json({ dehydratedState: dehydrate(queryClient) })
}

const DefaultLayoutRoute = () => {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  )
}

export default DefaultLayoutRoute

export function ErrorBoundary() {
  const error = useRouteError()
  // When NODE_ENV=production:
  // error.message = "Unexpected Server Error"
  // error.stack = undefined
  // eslint-disable-next-line no-console
  console.log(error)
  return <div>Found Error In Layout</div>
}
