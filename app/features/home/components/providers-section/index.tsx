import { FC } from 'react'

import { TProvidersResponse } from '@/schemas/home'

type Props = {
  providers: TProvidersResponse
}

export const ProvidersSection: FC<Props> = ({ providers }) => {
  return <div>ProvidersSection</div>
}
