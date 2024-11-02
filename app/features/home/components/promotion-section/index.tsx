import { FC } from 'react'

import { PromotionCard, SectionContainer } from '@/features/home'
import { TPromotionResponse } from '@/schemas/home'

type Props = {
  promotions: TPromotionResponse
}

export const PromotionSection: FC<Props> = ({ promotions }) => {
  return (
    <SectionContainer title="Hadiah & Promosi">
      {promotions?.data?.map((promotion) => (
        <PromotionCard
          promotion={promotion}
          key={promotion.id}
        />
      ))}
    </SectionContainer>
  )
}
