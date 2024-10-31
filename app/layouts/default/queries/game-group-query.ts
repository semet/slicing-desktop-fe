import { useSuspenseQuery } from '@tanstack/react-query'

import { generalKeys } from '@/factories/general'
import { useGetPlayer } from '@/features/player'
import { getGameGroupRequest } from '@/layouts/default'

export const useGameGroup = () => {
  const { data: player } = useGetPlayer()
  const currency =
    player?.data?.account?.bank?.currency?.code?.toLowerCase() ?? 'idr'
  return useSuspenseQuery({
    queryKey: generalKeys.gameGroup(),
    queryFn: () =>
      getGameGroupRequest({
        currency
      })
  })
}
