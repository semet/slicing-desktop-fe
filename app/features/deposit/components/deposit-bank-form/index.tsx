import { useFetcher } from '@remix-run/react'
import { FC, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Input, Select } from '@/components/ui'
import { useLayout, useUser } from '@/contexts'
import { PromotionPopup } from '@/features/deposit'
import { useGetPromotion } from '@/features/home'
import {
  TBanksByCurrency,
  TCompanyBank,
  TCreateDeposit
} from '@/schemas/deposit'
import { TPromotion } from '@/schemas/home'

type TProps = {
  banks: TBanksByCurrency[]
  companyBanks: TCompanyBank[]
  category: string
}

export const DepositBankForm: FC<TProps> = ({ banks, companyBanks }) => {
  const fetcher = useFetcher()
  const { webSettings, language } = useLayout()
  const { player } = useUser()
  const { data: promotions } = useGetPromotion({
    currency: player?.account?.bank?.currency?.code?.toLowerCase() ?? 'idr',
    language: language ?? 'en',
    bonus: true,
    showCental: webSettings?.show_promotion?.value === 'true' ? 'true' : 'false'
  })
  const formMethods = useForm<TCreateDeposit>({
    defaultValues: {
      transaction_category_id: 2,
      player_id: player?.id,
      deposit_type: 'bank_transfer',
      bank: {
        label: '',
        value: ''
      },
      company_bank_account_id: {
        label: '',
        value: ''
      }
    }
  })
  const { setValue, watch, resetField } = formMethods
  const watchedBank = watch('bank')
  const onChangePromotion = (data: TPromotion | null) => {
    setValue('bonus_id', data ? data.id : null)
  }
  const selectedPromotion = promotions?.data?.find(
    (promo) => promo.id === watch('bonus_id')
  )

  const bankOptions = useMemo(
    () =>
      banks
        .filter((bank) =>
          companyBanks
            .map((companyBank) => companyBank.bank_id)
            .includes(bank.id)
        )
        .map((bank) => ({
          label: bank.name,
          value: bank.id
        })),
    [banks, companyBanks]
  )
  const filteredCompanyBanks = useMemo(
    () =>
      companyBanks
        .filter((companyBank) => companyBank.bank_id === watchedBank.value)
        ?.map((companyBank) => ({
          label: companyBank.account_name,
          value: companyBank.id
        })),
    [companyBanks, watchedBank.value]
  )

  return (
    <FormProvider {...formMethods}>
      <fetcher.Form>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <div className="bg-indigo-100">
              {selectedPromotion
                ? selectedPromotion.title
                : 'Deposit without promotion'}
            </div>
            <PromotionPopup
              onChange={onChangePromotion}
              promotions={promotions?.data}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select<TCreateDeposit>
              name="bank"
              label="Bank Transfer"
              options={bankOptions}
              onChange={() => {
                resetField('company_bank_account_id')
              }}
            />
            <Select<TCreateDeposit>
              name="company_bank_account_id"
              label="Bank Transfer"
              disabled={!watchedBank}
              options={filteredCompanyBanks}
            />
            <Input<TCreateDeposit>
              name="amount"
              type="number"
              label="Amount"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
        </div>
      </fetcher.Form>
    </FormProvider>
  )
}
