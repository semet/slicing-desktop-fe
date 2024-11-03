import HttpServer from '@/libs/http-server'
import { companyBanksSchema } from '@/schemas/deposit'
import { TParamsWithToken } from '@/types'
import { handleError } from '@/utils'

type Params = TParamsWithToken<{
  status?: number
  bank_id?: string[]
  bank_category?: string
}>

export const getCompanyBankAccounts = async (params: Params) => {
  const { accessToken, status, bank_category, bank_id } = params

  try {
    const { data } = await HttpServer(accessToken).get(
      '/company-bank-accounts',
      {
        params: {
          status,
          ...(bank_id && { bank_id: bank_id.join(',') }),
          ...(bank_category && { bank_category })
        }
      }
    )
    return companyBanksSchema.parse(data)
  } catch (err) {
    handleError(err)
  }
}
