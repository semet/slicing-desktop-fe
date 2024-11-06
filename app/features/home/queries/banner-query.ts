import { useSuspenseQuery } from '@tanstack/react-query'

import { useLayout, useUser } from '@/contexts'
import { homeKeys } from '@/factories/home'
import { getBannerCarousel } from '@/features/home'

export const useGetBannerCarousel = () => {
  const { webSettings } = useLayout()
  const { player } = useUser()
  const showCentral =
    webSettings?.show_banner?.value === 'true' ? 'true' : 'false'
  const currency = player?.account?.bank?.currency?.code?.toLowerCase() ?? 'idr'
  return useSuspenseQuery({
    queryKey: homeKeys.bannerCarousel,
    queryFn: () =>
      getBannerCarousel({
        language: 'id',
        showCentral,
        currency
      })
  })
}
