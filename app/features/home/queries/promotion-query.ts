import { useQuery } from '@tanstack/react-query'

import { homeKeys } from '@/factories/home'
import { getPromotion } from '@/features/home'

type Params = {
  language: string
  currency: string
  bonus?: boolean
  showCental?: 'true' | 'false'
  limit?: number
  page?: number
}

export const useGetPromotion = (params: Params) => {
  return useQuery({
    queryKey: homeKeys.promotions(params),
    queryFn: () => getPromotion(params)
  })
}
