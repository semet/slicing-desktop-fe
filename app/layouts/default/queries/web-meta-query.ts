import { useSuspenseQuery } from '@tanstack/react-query'

import { generalKeys } from '@/factories/general'
import { getWebMetasRequest } from '@/layouts/default'

export const useWebMeta = () => {
  return useSuspenseQuery({
    queryKey: generalKeys.webMeta,
    queryFn: getWebMetasRequest
  })
}
