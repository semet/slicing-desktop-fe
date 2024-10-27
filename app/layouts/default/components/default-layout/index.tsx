import { FC, PropsWithChildren } from 'react'

import {
  FooterContainer,
  FooterLeft,
  FooterRight,
  HeaderBottom,
  HeaderCenter,
  HeaderPrimary,
  HeaderSecondary,
  HeaderTop,
  useActiveStyle
} from '@/layouts/default'
import makeStyle from '@/libs/make-style'

export const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  const { data } = useActiveStyle()

  const style = makeStyle(data.data).get('desktop_homepage_body')
  return (
    <main
      className="h-full max-w-full bg-cover bg-fixed bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${style.background_body_image})`
      }}
    >
      <HeaderPrimary>
        <HeaderTop />
        <HeaderCenter />
        <HeaderBottom />
        <HeaderSecondary />
      </HeaderPrimary>
      <div className="min-h-screen">{children}</div>
      <FooterContainer>
        <FooterLeft />
        <FooterRight />
      </FooterContainer>
    </main>
  )
}
