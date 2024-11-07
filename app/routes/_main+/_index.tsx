import { defer, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import {
  Await,
  ShouldRevalidateFunction,
  useLoaderData
} from '@remix-run/react'
import { Suspense } from 'react'

import { useUser } from '@/contexts'
import {
  BannerCarousel,
  BannerCarouselError,
  BannerCarouselSkeleton,
  FavoriteGameSection,
  FavoriteGameSkeleton,
  getBanks,
  getBannerCarousel,
  getProviders,
  PaymentMethodSkeleton,
  PaymentMethodsSection,
  ProgressiveJackpotSection,
  PromotionSection,
  PromotionSkeleton,
  ProviderSkeleton,
  ProvidersSection
} from '@/features/home'
import { ErrorWrapper } from '@/layouts/error'
import { parseLanguageFromHeaders } from '@/utils'

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

  const bannersData = getBannerCarousel({
    language: language ?? 'id'
  })
  const banks = getBanks()

  const providers = getProviders()
  return defer(
    {
      banks,
      bannersData,
      providers
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    }
  )
}

export const shouldRevalidate: ShouldRevalidateFunction = ({
  actionResult,
  formAction,
  defaultShouldRevalidate
}) => {
  const formActions = ['/login', '/logout']
  if (!formAction) return false

  if (formActions.includes(formAction) && 'success' in actionResult) {
    return defaultShouldRevalidate
  }
  return false
}

const Home = () => {
  const { bannersData, banks, providers } = useLoaderData<typeof loader>()
  const { player, accessToken } = useUser()

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

      {accessToken && player !== undefined && (
        <Suspense fallback={<FavoriteGameSkeleton />}>
          <FavoriteGameSection />
        </Suspense>
      )}
      <Suspense fallback={<PaymentMethodSkeleton />}>
        <Await resolve={banks}>
          {(banks) => <PaymentMethodsSection banks={banks} />}
        </Await>
      </Suspense>
      <Suspense fallback={<PromotionSkeleton />}>
        <PromotionSection />
      </Suspense>
      <Suspense fallback={<ProviderSkeleton />}>
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
