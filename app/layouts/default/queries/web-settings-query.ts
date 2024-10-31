import { useSuspenseQuery } from '@tanstack/react-query'

import { generalKeys } from '@/factories/general'
import { getWebSettingsRequest } from '@/layouts/default'

export const useWebSettings = () => {
  return useSuspenseQuery({
    queryKey: generalKeys.webSettings,
    queryFn: getWebSettingsRequest
  })
}
