import { FC, PropsWithChildren } from 'react'

export const HeaderPrimary: FC<PropsWithChildren> = ({ children }) => {
  return <div className="sticky top-0">{children}</div>
}
