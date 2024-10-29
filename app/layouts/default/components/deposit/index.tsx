import { DepositIcon } from '@/components/icons'

export const Deposit = () => {
  return (
    <button className="flex min-w-32 items-center justify-center gap-2 rounded-full bg-green-500 py-2 font-semibold text-white hover:bg-green-700">
      <DepositIcon className="h-5 w-5" />
      Deposit
    </button>
  )
}
