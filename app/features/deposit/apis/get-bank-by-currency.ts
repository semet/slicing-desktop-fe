import HttpServer from '@/libs/http-server'
import { bankByCurrencySchema } from '@/schemas/deposit'
import { TParamsWithToken } from '@/types'

type Params = TParamsWithToken<{
  currencyId?: string
}>

export const getBankByCurrencyRequest = async (params: Params) => {
  const { accessToken, currencyId } = params
  try {
    const { data } = await HttpServer(accessToken).get(
      `/banks/currency/${currencyId}`
    )
    return bankByCurrencySchema.parse(data)
  } catch (err) {
    throw new Error('Failed to get Bank Data')
  }
}
