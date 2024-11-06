import { LoaderFunctionArgs, defer } from '@remix-run/node'
import {
  Await,
  Outlet,
  ShouldRevalidateFunction,
  useLoaderData
} from '@remix-run/react'
import { Suspense } from 'react'

import { UserProvider, useStyle } from '@/contexts'
import { getPlayerRequest } from '@/features/player'
import {
  FooterContainer,
  FooterLeft,
  FooterRight,
  getGameGroupRequest,
  HeaderBottom,
  HeaderCenter,
  HeaderPrimary,
  HeaderSecondary,
  HeaderTop
} from '@/layouts/default'
import { ErrorWrapper } from '@/layouts/error'
import { checkIfTokenExpires } from '@/libs/token'
import { TPlayerResponse } from '@/schemas/player'
import { extractCookieFromHeaders, extractStyle } from '@/utils'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const headers = request.headers
  const accessToken = extractCookieFromHeaders(headers, 'token')
  const isTokenExpires = checkIfTokenExpires(accessToken)
  let playerData: TPlayerResponse | undefined
  const gameGroup = getGameGroupRequest({
    currency:
      playerData?.data?.account?.bank?.currency?.code?.toLowerCase() ?? 'idr'
  })
  if (accessToken && !isTokenExpires) {
    playerData = await getPlayerRequest({ accessToken })
  }
  return defer({
    accessToken,
    gameGroup,
    player: playerData?.data
  })
}

export const shouldRevalidate: ShouldRevalidateFunction = ({
  actionResult,
  formAction,
  defaultShouldRevalidate
}) => {
  const formActions = ['/login', '/logout']
  if (!formAction) return false

  if (formActions.includes(formAction) && 'success' in actionResult) {
    console.log('success in actionResult _layout')
    return defaultShouldRevalidate
  }
  return true
}

const DefaultLayoutRoute = () => {
  const { gameGroup, ...rest } = useLoaderData<typeof loader>()
  const { styles } = useStyle()
  const style = extractStyle(styles).get('desktop_homepage_body')
  return (
    <UserProvider value={rest}>
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
          <Suspense fallback={null}>
            <Await resolve={gameGroup}>
              {(gameGroup) => <HeaderSecondary gameGroup={gameGroup} />}
            </Await>
          </Suspense>
        </HeaderPrimary>
        <div className="min-h-screen">
          <Outlet />
        </div>
        <FooterContainer>
          <FooterLeft />
          <FooterRight />
        </FooterContainer>
      </main>
    </UserProvider>
  )
}

export default DefaultLayoutRoute

export function ErrorBoundary() {
  return <ErrorWrapper title="Error caught in _layout.tsx" />
}
