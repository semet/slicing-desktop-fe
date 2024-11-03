import { FC } from 'react'

import { TBanksByCurrency, TCompanyBank } from '@/schemas/deposit'
import { TPlayer } from '@/schemas/player'

type TProps = {
  banks: TBanksByCurrency[]
  companyBanks: TCompanyBank[]
  player: TPlayer
}

export const DepositCryptoForm: FC<TProps> = () => {
  return <div>DepositCryptoForm</div>
}
