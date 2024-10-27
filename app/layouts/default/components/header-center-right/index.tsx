import { useState } from 'react'

import { AccountInfo } from './account-info'
import { Authentication } from './authentication'

export const HeaderCenterRight = () => {
  const [isLogin] = useState<boolean>(true)
  return <div>{!isLogin ? <Authentication /> : <AccountInfo />}</div>
}
