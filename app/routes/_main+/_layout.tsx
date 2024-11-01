import { LoaderFunctionArgs } from '@remix-run/node'
import { defer, Outlet, useLoaderData } from '@remix-run/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import { generalKeys } from '@/factories/general'
import { playersKeys } from '@/factories/players'
import { getPlayerRequest } from '@/features/player'
import {
  FooterContainer,
  FooterLeft,
  FooterRight,
  getCaptchaRequest,
  getGameGroupRequest,
  getStyleRequest,
  HeaderBottom,
  HeaderCenter,
  HeaderPrimary,
  HeaderSecondary,
  HeaderTop
} from '@/layouts/default'
import { ErrorWrapper } from '@/layouts/error'
import { checkIfTokenExpires } from '@/libs/token'
import { TDesktopStyleData } from '@/schemas/general'
import { TPlayer } from '@/schemas/player'
import { extractCookieFromHeaders, extractStyle } from '@/utils'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const headers = request.headers
  const accessToken = extractCookieFromHeaders(headers, 'token')
  const isTokenExpires = checkIfTokenExpires(accessToken)

  const queryClient = new QueryClient()
  let playerData: TPlayer | undefined
  await queryClient.prefetchQuery({
    queryKey: generalKeys.captcha,
    queryFn: () =>
      getCaptchaRequest({
        action: 'login'
      })
  })
  if (accessToken && !isTokenExpires) {
    await queryClient.prefetchQuery({
      queryKey: playersKeys.player,
      queryFn: () => getPlayerRequest({ accessToken })
    })
    playerData = queryClient.getQueryData<TPlayer>(playersKeys.player)
  }

  await queryClient.prefetchQuery({
    queryKey: generalKeys.activeStyle,
    queryFn: getStyleRequest
  })

  await queryClient.prefetchQuery({
    queryKey: generalKeys.gameGroup(),
    queryFn: () =>
      getGameGroupRequest({
        currency:
          playerData?.data?.account?.bank?.currency?.code?.toLowerCase() ??
          'idr'
      })
  })

  return defer(
    {
      dehydratedState: dehydrate(queryClient),
      styleData: queryClient.getQueryData<TDesktopStyleData>(
        generalKeys.activeStyle
      )
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    }
  )
}

const DefaultLayoutRoute = () => {
  const { styleData } = useLoaderData<typeof loader>()
  const style = extractStyle(styleData?.data).get('desktop_homepage_body')
  return (
    <main
      className="h-full bg-cover bg-fixed bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${style?.background_body_image})`
      }}
    >
      <HeaderPrimary>
        <HeaderTop />
        <HeaderCenter />
        <HeaderBottom />
        <HeaderSecondary />
      </HeaderPrimary>
      <div className="min-h-screen">
        <Outlet />
      </div>
      <FooterContainer>
        <FooterLeft />
        <FooterRight />
      </FooterContainer>
    </main>
  )
}

export default DefaultLayoutRoute

export function ErrorBoundary() {
  return <ErrorWrapper title="Error caught in _layout.tsx" />
}
