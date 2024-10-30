import {
  QueryClient,
  QueryFunctionContext,
  QueryKey
} from '@tanstack/react-query'
import Cookies from 'js-cookie'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      staleTime: 60 * 1000
    }
  }
})

export default queryClient

export const withAccessToken = <TQueryFnData>(
  queryFn: (
    context: QueryFunctionContext<QueryKey> & { accessToken: string }
  ) => Promise<TQueryFnData>
) => {
  return (context: QueryFunctionContext<QueryKey>): Promise<TQueryFnData> => {
    const accessToken = Cookies.get('token')
    if (!accessToken) {
      throw new Error('No access token found')
    }
    return queryFn({ ...context, accessToken })
  }
}
