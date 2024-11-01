import { useSuspenseQuery } from '@tanstack/react-query'

import { homeKeys } from '@/factories/home'
import { getLastPlayedGames } from '@/features/home'

export const useGetLastPlayed = () => {
  return useSuspenseQuery({
    queryKey: homeKeys.lastPlayedGames,
    queryFn: getLastPlayedGames
  })
}
