import { useState } from 'react'

import { AccountInfo, Authentication } from '@/layouts/default'

export const HeaderCenterRight = () => {
  const [isLogin] = useState<boolean>(false)
  return <div>{!isLogin ? <Authentication /> : <AccountInfo />}</div>
}
