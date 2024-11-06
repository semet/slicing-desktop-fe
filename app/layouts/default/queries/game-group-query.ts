import { useSuspenseQuery } from '@tanstack/react-query'

import { useUser } from '@/contexts'
import { generalKeys } from '@/factories/general'
import { getGameGroupRequest } from '@/layouts/default'

export const useGameGroup = () => {
  const { player } = useUser()
  const currency = player?.account?.bank?.currency?.code?.toLowerCase() ?? 'idr'
  return useSuspenseQuery({
    queryKey: generalKeys.gameGroup(),
    queryFn: () =>
      getGameGroupRequest({
        currency
      })
  })
}
