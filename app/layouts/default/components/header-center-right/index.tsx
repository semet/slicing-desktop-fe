import { useLayout } from '@/contexts'
import { AccountInfo, Authentication } from '@/layouts/default'

export const HeaderCenterRight = () => {
  const { player } = useLayout()

  return (
    <div>{player !== undefined ? <AccountInfo /> : <Authentication />}</div>
  )
}
