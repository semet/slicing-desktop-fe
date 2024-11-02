import { defer, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Await, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'

import {
  BannerCarousel,
  BannerCarouselError,
  BannerCarouselSkeleton,
  FavoriteGameSection,
  FavoriteGameSkeleton,
  getBanks,
  getBannerCarousel,
  getFavoriteGames,
  getPromotion,
  getProviders,
  PaymentMethodSkeleton,
  PaymentMethodsSection,
  ProgressiveJackpotSection,
  PromotionSection,
  PromotionSkeleton,
  ProvidersSection
} from '@/features/home'
import { ErrorWrapper } from '@/layouts/error'
import { checkIfTokenExpires } from '@/libs/token'
import { extractCookieFromHeaders, parseLanguageFromHeaders } from '@/utils'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Home'
    }
  ]
}

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
  const banks = getBanks()
  const promotions = getPromotion({
    language: language ?? 'id'
  })
  const providers = getProviders()

  return defer(
    {
      bannersData,
      favoriteGames,
      isAuthenticated,
      banks,
      promotions,
      providers
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    }
  )
}

const Home = () => {
  const {
    isAuthenticated,
    bannersData,
    favoriteGames,
    banks,
    promotions,
    providers
  } = useLoaderData<typeof loader>()

  return (
    <div className="flex flex-col gap-10">
      <Suspense fallback={<BannerCarouselSkeleton />}>
        <Await
          resolve={bannersData}
          errorElement={<BannerCarouselError />}
        >
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
      <Suspense fallback={<PaymentMethodSkeleton />}>
        <Await resolve={banks}>
          {(banks) => <PaymentMethodsSection banks={banks} />}
        </Await>
      </Suspense>
      <Suspense fallback={<PromotionSkeleton />}>
        <Await resolve={promotions}>
          {(promotions) => <PromotionSection promotions={promotions} />}
        </Await>
      </Suspense>
      <Suspense fallback={null}>
        <Await resolve={providers}>
          {(providers) => <ProvidersSection providers={providers} />}
        </Await>
      </Suspense>
    </div>
  )
}

export default Home

export function ErrorBoundary() {
  return <ErrorWrapper title="Error caught in _index.tsx" />
}
