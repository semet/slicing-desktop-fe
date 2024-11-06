import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { MetaFunction, useLoaderData, useSearchParams } from '@remix-run/react'
import { twMerge } from 'tailwind-merge'

import { PageContainer } from '@/components/ui'
import {
  getBankByCurrencyRequest,
  getCompanyBankAccounts,
  useDepositTabs
} from '@/features/deposit'
import { getPromotion } from '@/features/home'
import { getPlayerRequest } from '@/features/player'
import { getWebSettingsRequest } from '@/layouts/default'
import { checkIfTokenExpires } from '@/libs/token'
import { extractCookieFromHeaders, parseLanguageFromHeaders } from '@/utils'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Deposit'
    }
  ]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const headers = request.headers
  const language = parseLanguageFromHeaders(headers)
  const accessToken = extractCookieFromHeaders(headers, 'token')
  const isTokenExpires = checkIfTokenExpires(accessToken)
  const isAuthenticated = accessToken && !isTokenExpires
  if (!isAuthenticated) {
    return redirect('/')
  }

  const player = await getPlayerRequest({ accessToken })
  const webSettings = await getWebSettingsRequest()
  const promotions = await getPromotion({
    language: language ?? 'id',
    bonus: true,
    currency:
      player?.data?.account?.bank?.currency?.code.toLowerCase() || 'idr',
    showCental:
      webSettings?.data?.show_promotion?.value === 'true' ? 'true' : 'false'
  })
  const bankByCurrency = await getBankByCurrencyRequest({
    accessToken,
    currencyId: player.data.account.bank.currency_id
  })

  const companyBankAccounts = await getCompanyBankAccounts({
    accessToken
  })
  return json(
    {
      bankByCurrency,
      companyBankAccounts,
      promotions,
      player
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    }
  )
}

const DepositPage = () => {
  const { bankByCurrency, companyBankAccounts, promotions, player } =
    useLoaderData<typeof loader>()

  const { tabItems } = useDepositTabs({
    bankByCurrency,
    companyBankAccounts,
    promotions,
    player
  })
  const [searchParams, setSearchParams] = useSearchParams()

  const defaultTabIndex = tabItems.findIndex(
    (item) =>
      item.label.split(' ').join('-').toLowerCase() === searchParams.get('tab')
  )

  return (
    <PageContainer title="Deposit">
      <TabGroup
        className="flex w-full gap-2"
        defaultIndex={
          defaultTabIndex === -1 ||
          searchParams.get('tab') === null ||
          searchParams.get('tab') === 'bank-transfer'
            ? 0
            : defaultTabIndex
        }
        onChange={(index) => {
          setSearchParams({
            tab: tabItems[index].label.split(' ').join('-').toLowerCase()
          })
        }}
      >
        <TabList className="flex min-w-72 flex-col items-start bg-green-600 text-white">
          {tabItems.map(({ icon, id, label }) => (
            <Tab
              key={id}
              className="w-full text-start outline-none"
            >
              {({ selected, hover }) => (
                <div
                  className={twMerge([
                    'flex w-full cursor-pointer items-center gap-2 px-4 py-2',
                    selected ? 'bg-red-700' : '',
                    hover ? 'bg-red-700' : ''
                  ])}
                >
                  {icon}
                  <span>{label}</span>
                </div>
              )}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="flex-1 bg-red-500 p-2">
          {tabItems.map(({ content, id }) => (
            <TabPanel key={id}>
              <div className="p-4">{content}</div>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </PageContainer>
  )
}

export default DepositPage
