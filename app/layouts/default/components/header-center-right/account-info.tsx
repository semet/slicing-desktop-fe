import { CoinStatus } from './coin-status'
import { CurrentUser } from './current-user'
import { Inbox } from './inbox'

export const AccountInfo = () => {
  return (
    <div className="flex items-center gap-4">
      <Inbox />
      <CurrentUser />
      <CoinStatus />
    </div>
  )
}
