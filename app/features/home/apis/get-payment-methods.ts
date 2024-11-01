import HttpServer from '@/libs/http-server'
import { paymentMethodsSchema } from '@/schemas/home'

export const getPaymentMethods = async () => {
  try {
    const { data } = await HttpServer().get('/banks')
    return paymentMethodsSchema.parse(data)
  } catch (err) {
    throw new Error('Failed to fetch payment methods')
  }
}
