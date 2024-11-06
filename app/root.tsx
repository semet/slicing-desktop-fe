import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node'
import {
  defer,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError
} from '@remix-run/react'
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getClientLocales } from 'remix-utils/locales/server'
import { useDehydratedState } from 'use-dehydrated-state'
import './tailwind.css'

import { LayoutProvider, StyleProvider } from './contexts'
import { getPlayerRequest } from './features/player'
import {
  getGameGroupRequest,
  getLanguageSettingsRequest,
  getStyleRequest,
  getWebMetasRequest,
  getWebSettingsRequest
} from './layouts/default'
import { checkIfTokenExpires } from './libs/token'
import { TPlayerResponse } from './schemas/player'
import { extractCookieFromHeaders, parseLanguageFromHeaders } from './utils'

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
  const locales = getClientLocales(request)
  const headers = request.headers
  const language = parseLanguageFromHeaders(headers)
  const accessToken = extractCookieFromHeaders(headers, 'token')
  const isTokenExpires = checkIfTokenExpires(accessToken)

  let playerData: TPlayerResponse | undefined

  const languageSettings = getLanguageSettingsRequest({
    lang: language
  })
  const gameGroup = getGameGroupRequest({
    currency:
      playerData?.data?.account?.bank?.currency?.code?.toLowerCase() ?? 'idr'
  })
  if (accessToken && !isTokenExpires) {
    playerData = await getPlayerRequest({ accessToken })
  }

  const styles = await getStyleRequest()

  const webSettings = await getWebSettingsRequest()
  const webMeta = await getWebMetasRequest()

  return defer({
    accessToken,
    language,
    player: playerData?.data,
    styles: styles.data,
    webMeta: webMeta.data,
    webSettings: webSettings.data,
    // game group and language settings are not resolver yet, so we send the entire promise to the context
    // let the component handle the promise using Suspense and Await
    gameGroup,
    languageSettings,
    locales,
    ENV: {
      API_URL: process.env.API_URL,
      API_KEY: process.env.API_KEY
    }
  })
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { ENV, webSettings } = useLoaderData<typeof loader>()
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
          src={`https://www.googletagmanager.com/gtag/js?id=${webSettings?.web_google_analytics.value}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${webSettings?.web_google_analytics.value}', {
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
  const { styles, ...rest } = useLoaderData<typeof loader>()

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
        <StyleProvider styles={styles}>
          <LayoutProvider data={rest}>
            <Outlet />
          </LayoutProvider>
        </StyleProvider>
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
