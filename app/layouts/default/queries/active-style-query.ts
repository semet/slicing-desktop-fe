import { useSuspenseQuery } from '@tanstack/react-query'

import { generalKeys } from '@/factories/general'
import { getStyleRequest } from '@/layouts/default'

export const useActiveStyle = () => {
  return useSuspenseQuery({
    queryKey: generalKeys.activeStyle,
    queryFn: getStyleRequest
  })
}
