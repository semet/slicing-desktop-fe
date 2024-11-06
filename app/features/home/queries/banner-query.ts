import { useSuspenseQuery } from '@tanstack/react-query'

import { useLayout } from '@/contexts'
import { homeKeys } from '@/factories/home'
import { getBannerCarousel } from '@/features/home'

export const useGetBannerCarousel = () => {
  const { player, webSettings } = useLayout()

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
