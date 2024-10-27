import { useSuspenseQuery } from '@tanstack/react-query'

import { generalKeys } from '@/factories/general'
import HttpClient from '@/libs/http-client'
import { styleSchema } from '@/schemas/general'

export const useActiveStyle = () => {
  return useSuspenseQuery({
    queryKey: generalKeys.activeStyle,
    queryFn: async () => {
      const { data } = await HttpClient().get('/themes/active/style_options')
      return styleSchema.parse(data)
    }
  })
}
