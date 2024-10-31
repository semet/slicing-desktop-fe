import { FC, PropsWithChildren } from 'react'

import { useActiveStyle } from '@/layouts/default'
import { extractStyle } from '@/utils'

export const HeaderPrimary: FC<PropsWithChildren> = ({ children }) => {
  const { data } = useActiveStyle()

  const style = extractStyle(data?.data).get('desktop_homepage_body')

  return (
    <div
      className="sticky top-0 z-20 bg-cover bg-fixed bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${style.background_body_image})`
      }}
    >
      {children}
    </div>
  )
}
