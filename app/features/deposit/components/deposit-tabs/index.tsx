import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useSearchParams } from '@remix-run/react'
import { Suspense, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

import { DepositTabsSkeleton, useDepositTabs } from '@/features/deposit'

export const DepositTabs = () => {
  const { tabItems, isLoadingAccounts, isLoadingBank } = useDepositTabs()
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultTabIndex = useMemo(
    () =>
      tabItems.findIndex(
        (item) =>
          item.label.split(' ').join('-').toLowerCase() ===
          searchParams.get('tab')
      ),
    [searchParams, tabItems]
  )

  return isLoadingAccounts || isLoadingBank ? (
    <DepositTabsSkeleton />
  ) : (
    <Suspense fallback={<DepositTabsSkeleton />}>
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
    </Suspense>
  )
}
