import { FC } from 'react'

import { TPaymentMethodsResponse } from '@/schemas/home'

type Props = {
  paymentMethods: TPaymentMethodsResponse
}

export const PaymentMethodsSection: FC<Props> = ({ paymentMethods }) => {
  return <div>PaymentMethods</div>
}
