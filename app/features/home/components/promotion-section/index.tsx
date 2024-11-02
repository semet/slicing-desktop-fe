import { FC } from 'react'

import { TPromotionResponse } from '@/schemas/home'

type Props = {
  promotions: TPromotionResponse
}

export const PromotionSection: FC<Props> = ({ promotions }) => {
  return <div>PromotionSection</div>
}
