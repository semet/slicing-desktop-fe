import { LoaderFunctionArgs } from '@remix-run/node'
import { Await, defer, useLoaderData } from '@remix-run/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { Suspense } from 'react'

import { homeKeys } from '@/factories/home'
import {
  BannerCarousel,
  BannerCarouselSkeleton,
  getBannerCarousel,
  ProgressiveJackpot
} from '@/features/home'
import { ErrorWrapper } from '@/layouts/error'
import { parseLanguageFromHeaders } from '@/utils'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const headers = request.headers
  const language = parseLanguageFromHeaders(headers)
  const queryClient = new QueryClient()

  queryClient.prefetchQuery({
    queryKey: homeKeys.bannerCarousel,
    queryFn: async () =>
      getBannerCarousel({
        language: language ?? 'id'
      })
  })

  return defer({
    dehydratedState: dehydrate(queryClient)
  })
}

const Home = () => {
  const { dehydratedState } = useLoaderData<typeof loader>()
  return (
    <div className="flex flex-col gap-10">
      <Suspense fallback={<BannerCarouselSkeleton />}>
        <Await resolve={dehydratedState}>
          <BannerCarousel />
        </Await>
      </Suspense>
      <ProgressiveJackpot />
    </div>
  )
}

export default Home

export function ErrorBoundary() {
  return <ErrorWrapper title="Error caught in _index.tsx" />
}
