import { useSuspenseQuery } from '@tanstack/react-query'

import { generalKeys } from '@/factories/general'
import { getLanguageSettingsRequest } from '@/layouts/default'

export const useActiveLanguage = () => {
  return useSuspenseQuery({
    queryKey: generalKeys.language,
    queryFn: () => getLanguageSettingsRequest({ lang: 'en' })
  })
}
