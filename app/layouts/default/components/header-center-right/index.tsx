import { useGetPlayer } from '@/features/player'
import { AccountInfo, Authentication } from '@/layouts/default'

export const HeaderCenterRight = () => {
  const { data } = useGetPlayer()
  return <div>{data !== undefined ? <AccountInfo /> : <Authentication />}</div>
}
