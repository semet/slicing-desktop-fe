import { useSuspenseQuery } from '@tanstack/react-query'

import { homeKeys } from '@/factories/home'
import { getBannerCarousel } from '@/features/home'
import { useGetPlayer } from '@/features/player'
import { useWebSettings } from '@/layouts/default'

export const useGetBannerCarousel = () => {
  const { data: player } = useGetPlayer()
  const { data: webSettings } = useWebSettings()

  const showCentral =
    webSettings?.data?.show_banner?.value === 'true' ? 'true' : 'false'
  const currency =
    player?.data?.account?.bank?.currency?.code?.toLowerCase() ?? 'idr'
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
