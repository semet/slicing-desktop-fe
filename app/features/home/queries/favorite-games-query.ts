import { useSuspenseQuery } from '@tanstack/react-query'
import Cookie from 'js-cookie'

import { homeKeys } from '@/factories/home'
import { getFavoriteGames } from '@/features/home'

export const useGetFavoriteGames = () => {
  const token = Cookie.get('token')
  return useSuspenseQuery({
    queryKey: homeKeys.favoriteGames,
    queryFn: () => getFavoriteGames({ accessToken: token })
    // enabled: !!token
  })
}
