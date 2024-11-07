import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { MetaFunction } from '@remix-run/react'

import { PageContainer } from '@/components/ui'
import { DepositTabs } from '@/features/deposit'
import { handleToken } from '@/libs/token'
import { catchLoaderError } from '@/utils'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Deposit'
    }
  ]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { isTokenExpires, accessToken } = await handleToken(request)
  const isAuthenticated = accessToken && !isTokenExpires
  if (!isAuthenticated) {
    throw redirect('/')
  }

  try {
    return {
      success: true
    }
  } catch (error) {
    return catchLoaderError(error)
  }
}

const DepositPage = () => {
  return (
    <PageContainer title="Deposit">
      <DepositTabs />
    </PageContainer>
  )
}

export default DepositPage
