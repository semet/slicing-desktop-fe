import { useSuspenseQuery } from '@tanstack/react-query'

import { useUser } from '@/contexts'
import { homeKeys } from '@/factories/home'
import { getFavoriteGames } from '@/features/home'

export const useGetFavoriteGames = () => {
  const { accessToken } = useUser()
  return useSuspenseQuery({
    queryKey: homeKeys.favoriteGames(accessToken),
    queryFn: () => {
      if (accessToken) {
        return getFavoriteGames({ accessToken })
      } else {
        return Promise.resolve(null)
      }
    }
    // enabled: !!token
  })
}
