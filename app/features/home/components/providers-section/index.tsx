import { FC } from 'react'

import { TProvidersResponse } from '@/schemas/home'

type Props = {
  providers: TProvidersResponse
}

export const ProvidersSection: FC<Props> = ({ providers }) => {
  console.log(providers)
  return <div>ProvidersSection</div>
}
