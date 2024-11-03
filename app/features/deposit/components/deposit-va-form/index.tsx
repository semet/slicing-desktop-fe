import { FC } from 'react'

import { TCompanyBank } from '@/schemas/deposit'
import { TPlayer } from '@/schemas/player'

type TProps = {
  companyBanks: TCompanyBank[]
  player: TPlayer
}

export const DepositVaForm: FC<TProps> = () => {
  return <div>DepositVaForm</div>
}
