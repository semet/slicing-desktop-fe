import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node'
import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError
} from '@remix-run/react'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDehydratedState } from 'use-dehydrated-state'
import './tailwind.css'

import { generalKeys } from './factories/general'
import {
  getLanguageSettingsRequest,
  getWebMetasRequest,
  getWebSettingsRequest
} from './layouts/default'
import { TWebSettings } from './schemas/general'
import { parseLanguageFromHeaders } from './utils'

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous'
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap'
  }
]

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const headers = request.headers
  const language = parseLanguageFromHeaders(headers)

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: generalKeys.webSettings,
    queryFn: getWebSettingsRequest
  })

  await queryClient.prefetchQuery({
    queryKey: generalKeys.webMeta,
    queryFn: getWebMetasRequest
  })
  await queryClient.prefetchQuery({
    queryKey: generalKeys.language,
    queryFn: () => getLanguageSettingsRequest({ lang: language })
  })

  return json({
    dehydratedState: dehydrate(queryClient),
    ENV: {
      API_URL: process.env.API_URL,
      API_KEY: process.env.API_KEY
    },
    webSettingsData: queryClient.getQueryData<TWebSettings>(
      generalKeys.webSettings
    )
  })
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { ENV, webSettingsData } = useLoaderData<typeof loader>()
  return (
    <html
      lang="en"
      className="scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-600"
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
        ></meta>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${webSettingsData?.data?.web_google_analytics.value}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${webSettingsData?.data?.web_google_analytics.value}', {
                    page_path: window.location.pathname,
                  });
                `
          }}
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration getKey={(location) => location.pathname} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`
          }}
        />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
            refetchOnMount: false,
            refetchOnWindowFocus: false
          }
        }
      })
  )

  const dehydratedState = useDehydratedState()
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <Outlet />
      </HydrationBoundary>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  // eslint-disable-next-line no-console
  console.error(error)
  return (
    <html lang="en">
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div>
          <h1 className="text-5xl">Shit. error</h1>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
