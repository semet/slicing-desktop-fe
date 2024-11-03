import { z } from 'zod'

export const createDepositSchema = z.object({
  agent_note: z.string().nullable(),
  amount: z.number(),
  bank: z.object({
    label: z.string(),
    value: z.string()
  }),
  balance: z.number(),
  bonus_id: z.string().nullable(),
  company_bank_account_id: z.object({
    label: z.string(),
    value: z.string()
  }),
  deposit_type: z.enum(['crypto', 'qris', 'va', 'bank_transfer']),
  player_id: z.string(),
  player_note: z.string().nullable(),
  provider_id: z.number().nullable(),
  transaction_category_id: z.number()
})

export type TCreateDeposit = z.infer<typeof createDepositSchema>
