import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { Await, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'

import {
  BannerCarousel,
  BannerCarouselSkeleton,
  FavoriteGameSection,
  FavoriteGameSkeleton,
  getBannerCarousel,
  getFavoriteGames,
  PaymentMethods,
  ProgressiveJackpotSection
} from '@/features/home'
import { ErrorWrapper } from '@/layouts/error'
import { checkIfTokenExpires } from '@/libs/token'
import { extractCookieFromHeaders, parseLanguageFromHeaders } from '@/utils'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const headers = request.headers
  const language = parseLanguageFromHeaders(headers)
  const accessToken = extractCookieFromHeaders(headers, 'token')
  const isTokenExpires = checkIfTokenExpires(accessToken)

  const isAuthenticated = accessToken && !isTokenExpires

  const favoriteGames = isAuthenticated
    ? getFavoriteGames({ accessToken })
    : null

  const bannersData = getBannerCarousel({
    language: language ?? 'id'
  })

  return defer({
    bannersData,
    favoriteGames,
    isAuthenticated,
    headers
  })
}

const Home = () => {
  const { isAuthenticated, bannersData, favoriteGames } =
    useLoaderData<typeof loader>()

  return (
    <div className="flex flex-col gap-10">
      <Suspense fallback={<BannerCarouselSkeleton />}>
        <Await resolve={bannersData}>
          {(bannersData) => <BannerCarousel banners={bannersData} />}
        </Await>
      </Suspense>

      <ProgressiveJackpotSection />

      {isAuthenticated && (
        <Suspense fallback={<FavoriteGameSkeleton />}>
          <Await resolve={favoriteGames}>
            {(favoriteGames) => <FavoriteGameSection games={favoriteGames} />}
          </Await>
        </Suspense>
      )}
      <PaymentMethods />
    </div>
  )
}

export default Home

export function ErrorBoundary() {
  return <ErrorWrapper title="Error caught in _index.tsx" />
}
