import { FC } from 'react'

import { TBanksByCurrency, TCompanyBank } from '@/schemas/deposit'

type TProps = {
  banks: TBanksByCurrency[]
  companyBanks: TCompanyBank[]
}

export const DepositCryptoForm: FC<TProps> = () => {
  return <div>DepositCryptoForm</div>
}
