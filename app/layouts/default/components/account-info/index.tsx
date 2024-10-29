import { CoinStatus, CurrentUser, Inbox } from '@/layouts/default'

export const AccountInfo = () => {
  return (
    <div className="flex items-center gap-4">
      <Inbox />
      <CurrentUser />
      <CoinStatus />
    </div>
  )
}
