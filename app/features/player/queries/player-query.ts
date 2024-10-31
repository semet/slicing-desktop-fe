import { useQuery } from '@tanstack/react-query'
import Cookie from 'js-cookie'

import { playersKeys } from '@/factories/players'
import { getPlayerRequest } from '@/features/player'
import { TPlayer } from '@/schemas/player'

export const useGetPlayer = () => {
  const token = Cookie.get('token')

  return useQuery<TPlayer>({
    queryKey: playersKeys.player,
    queryFn: () => getPlayerRequest({ accessToken: token }),
    enabled: token !== undefined
  })
}
