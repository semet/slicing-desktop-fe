import { ReactNode, Suspense, useMemo } from 'react'

import {
  DpBankIcon,
  DpCryptoIcon,
  DpEwalletIcon,
  DpPulsaIcon,
  DpQrisIcon,
  DpVaIcon
} from '@/components/icons'
import { useLayout, useUser } from '@/contexts'
import {
  DepositBankForm,
  DepositCryptoForm,
  DepositQrisForm,
  DepositVaForm,
  useGetBankByCurrency,
  useGetCompanyBankAccounts
} from '@/features/deposit'
import { TBanksByCurrency, TCompanyBank } from '@/schemas/deposit'

export type TabItem = {
  id: number
  label: string
  icon: ReactNode
  content: ReactNode
}

export const useDepositTabs = () => {
  const { webSettings } = useLayout()
  const { player, accessToken } = useUser()
  const { data: bankByCurrency, isLoading: isLoadingBank } =
    useGetBankByCurrency({
      currencyId: player?.account?.bank?.currency_id,
      accessToken
    })

  const { data: companyBankAccounts, isLoading: isLoadingAccounts } =
    useGetCompanyBankAccounts({
      accessToken
    })

  const groupedBanks = useMemo(() => {
    return bankByCurrency?.data
      ?.filter((item) => [1, 2].includes(item.status))
      ?.reduce(
        (
          acc: Record<TBanksByCurrency['category'], TBanksByCurrency[]>,
          item
        ) => {
          if (!acc[item.category]) {
            acc[item.category] = []
          }
          acc[item.category].push(item)
          return acc
        },
        {} as Record<TBanksByCurrency['category'], TBanksByCurrency[]>
      )
  }, [bankByCurrency])

  const groupedCompanyBanks = useMemo(() => {
    return companyBankAccounts?.data
      ?.filter((item) => [1].includes(item.status))
      ?.reduce(
        (
          acc: { [key in TCompanyBank['bank']['category']]: TCompanyBank[] },
          item
        ) => {
          if (!acc[item.bank.category]) {
            acc[item.bank.category] = []
          }
          acc[item.bank.category].push(item)
          return acc
        },
        {} as { [key in TCompanyBank['bank']['category']]: TCompanyBank[] }
      )
  }, [companyBankAccounts])

  const tabItems = useMemo<TabItem[]>(() => {
    const items: TabItem[] = []
    if (
      webSettings?.payment_bank?.value === 'true' &&
      groupedBanks?.BANK?.length &&
      groupedCompanyBanks?.BANK?.length
    ) {
      items.push({
        id: 1,
        label: 'Bank Transfer',
        icon: <DpBankIcon />,
        content: (
          <Suspense>
            <DepositBankForm
              banks={groupedBanks?.BANK}
              companyBanks={groupedCompanyBanks?.BANK}
              key="BANK"
              category="BANK"
            />
          </Suspense>
        )
      })
    }

    if (
      webSettings?.payment_qris?.value === 'true' &&
      groupedBanks?.QRIS?.length &&
      groupedCompanyBanks?.QRIS?.length
    ) {
      items.push({
        id: 2,
        label: 'QRIS',
        icon: <DpQrisIcon />,
        content: <DepositQrisForm companyBanks={groupedCompanyBanks?.QRIS} />
      })
    }

    if (
      webSettings?.payment_va?.value === 'true' &&
      groupedBanks?.VA?.length &&
      groupedCompanyBanks?.VA?.length
    ) {
      items.push({
        id: 3,
        label: 'VA',
        icon: <DpVaIcon />,
        content: (
          <DepositVaForm
            companyBanks={groupedCompanyBanks?.VA}
            key="VA"
          />
        )
      })
    }

    if (
      webSettings?.payment_ewallet?.value === 'true' &&
      groupedBanks?.EWALLET?.length &&
      groupedCompanyBanks?.EWALLET?.length
    ) {
      items.push({
        id: 4,
        label: 'E-Wallet',
        icon: <DpEwalletIcon />,
        content: (
          <DepositBankForm
            banks={groupedBanks?.EWALLET}
            companyBanks={groupedCompanyBanks?.EWALLET}
            key="EWALLET"
            category="EWALLET"
          />
        )
      })
    }

    if (
      webSettings?.payment_phone_credit?.value === 'true' &&
      groupedBanks?.PULSA?.length &&
      groupedCompanyBanks?.PULSA?.length
    ) {
      items.push({
        id: 5,
        label: 'Pulsa',
        icon: <DpPulsaIcon />,
        content: (
          <DepositBankForm
            banks={groupedBanks?.PULSA}
            companyBanks={groupedCompanyBanks?.PULSA}
            key="PULSA"
            category="PULSA"
          />
        )
      })
    }

    if (
      webSettings?.payment_crypto?.value === 'true' &&
      groupedBanks?.CRYPTO?.length &&
      groupedCompanyBanks?.CRYPTO?.length
    ) {
      items.push({
        id: 6,
        label: 'Crypto',
        icon: <DpCryptoIcon />,
        content: (
          <DepositCryptoForm
            banks={groupedBanks?.CRYPTO}
            companyBanks={groupedCompanyBanks?.CRYPTO}
            key="CRYPTO"
          />
        )
      })
    }

    return items
  }, [webSettings, groupedBanks, groupedCompanyBanks])

  return {
    tabItems,
    groupedBanks,
    groupedCompanyBanks,
    isLoadingBank,
    isLoadingAccounts
  }
}
