import { useQuery } from '@tanstack/react-query'
import Cookie from 'js-cookie'

import { playersKeys } from '@/factories/players'

export const useGetPlayer = () => {
  const token = Cookie.get('token')

  return useQuery({
    queryKey: playersKeys.player,
    enabled: token !== undefined
  })
}
