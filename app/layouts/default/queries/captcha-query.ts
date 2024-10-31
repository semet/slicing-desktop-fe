import { useSuspenseQuery } from '@tanstack/react-query'

import { generalKeys } from '@/factories/general'
import { getCaptchaRequest } from '@/layouts/default'

export const useGetCaptcha = (params: { action?: string }) => {
  const { action = 'login' } = params
  return useSuspenseQuery({
    queryKey: generalKeys.captcha,
    queryFn: async () => getCaptchaRequest({ action })
  })
}
