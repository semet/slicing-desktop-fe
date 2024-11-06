import { Await, Outlet } from '@remix-run/react'
import { Suspense } from 'react'

import { useLayout, useStyle } from '@/contexts'
import {
  FooterContainer,
  FooterLeft,
  FooterRight,
  HeaderBottom,
  HeaderCenter,
  HeaderPrimary,
  HeaderSecondary,
  HeaderTop
} from '@/layouts/default'
import { ErrorWrapper } from '@/layouts/error'
import { extractStyle } from '@/utils'

const DefaultLayoutRoute = () => {
  const { gameGroup } = useLayout()
  const { styles } = useStyle()
  const style = extractStyle(styles).get('desktop_homepage_body')
  return (
    <main
      className="h-full bg-cover bg-fixed bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${style?.background_body_image})`
      }}
    >
      <HeaderPrimary>
        <HeaderTop />
        <HeaderCenter />
        <HeaderBottom />
        <Suspense fallback={null}>
          <Await resolve={gameGroup}>
            {(gameGroup) => <HeaderSecondary gameGroup={gameGroup} />}
          </Await>
        </Suspense>
      </HeaderPrimary>
      <div className="min-h-screen">
        <Outlet />
      </div>
      <FooterContainer>
        <FooterLeft />
        <FooterRight />
      </FooterContainer>
    </main>
  )
}

export default DefaultLayoutRoute

export function ErrorBoundary() {
  return <ErrorWrapper title="Error caught in _layout.tsx" />
}
