import { useQuery } from '@tanstack/react-query'
import Cookie from 'js-cookie'

import { playersKeys } from '@/factories/players'
import { TPlayer } from '@/schemas/player'

export const useGetPlayer = () => {
  const token = Cookie.get('token')

  return useQuery<TPlayer>({
    queryKey: playersKeys.player,
    enabled: token !== undefined
  })
}
