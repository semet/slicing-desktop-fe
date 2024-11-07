import { useQuery } from '@tanstack/react-query'

import { generalKeys } from '@/factories/general'
import { getCompanyBankAccounts } from '@/features/deposit'
import { TParamsWithToken } from '@/types'

type Params = TParamsWithToken
export const useGetCompanyBankAccounts = (params: Params) => {
  return useQuery({
    queryKey: generalKeys.companyBankAccounts(params.accessToken),
    queryFn: () =>
      getCompanyBankAccounts({
        accessToken: params.accessToken
      }),
    enabled: params.accessToken !== undefined,
    staleTime: Number.POSITIVE_INFINITY
  })
}
