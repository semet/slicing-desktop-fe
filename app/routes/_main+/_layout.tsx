import { json, Outlet, useRouteError } from '@remix-run/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import { generalKeys } from '@/factories/general'
import { DefaultLayout } from '@/layouts/default'
import HttpClient from '@/libs/http-client'

export const loader = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: generalKeys.activeStyle,
    queryFn: async () => {
      try {
        const { data } = await HttpClient().get('/themes/active/style_options')
        return data
      } catch (error) {
        throw new Error('Failed to get style data')
      }
    }
  })

  return json({ dehydratedState: dehydrate(queryClient) })
}

const ComponentName = () => {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  )
}

export default ComponentName

export function ErrorBoundary() {
  const error = useRouteError()
  // When NODE_ENV=production:
  // error.message = "Unexpected Server Error"
  // error.stack = undefined
  // eslint-disable-next-line no-console
  console.log(error)
  return <div>Found Error In Layout</div>
}
