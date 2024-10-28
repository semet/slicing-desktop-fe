import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, {
    message: 'Username is required'
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters'
  }),
  captcha: z.string().min(6, {
    message: 'Captcha must be at least 6 characters'
  }),
  remember: z.boolean()
})

export type TLoginForm = z.infer<typeof loginSchema>
