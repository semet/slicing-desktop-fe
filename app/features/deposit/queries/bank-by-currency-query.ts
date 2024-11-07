import { useQuery } from '@tanstack/react-query'

import { generalKeys } from '@/factories/general'
import { getBankByCurrencyRequest } from '@/features/deposit'
import { TParamsWithToken } from '@/types'

type Params = TParamsWithToken<{
  currencyId?: string
}>
export const useGetBankByCurrency = (params: Params) => {
  return useQuery({
    queryKey: generalKeys.bankByCurrency(params),
    queryFn: () =>
      getBankByCurrencyRequest({
        accessToken: params.accessToken,
        currencyId: params.currencyId
      }),
    enabled: params.currencyId !== '',
    staleTime: Number.POSITIVE_INFINITY
  })
}
