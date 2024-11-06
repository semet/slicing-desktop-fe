import { useLayout } from '@/contexts'
import {
  PromotionCard,
  SectionContainer,
  useGetPromotion
} from '@/features/home'

export const PromotionSection = () => {
  const { language, player } = useLayout()
  const { data: promotions } = useGetPromotion({
    language: language ?? 'id',
    currency: player?.account?.bank?.currency?.code?.toLowerCase() ?? 'idr'
  })
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
