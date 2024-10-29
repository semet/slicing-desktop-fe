import { TfiReload } from 'react-icons/tfi'

export const CoinStatus = () => {
  return (
    <div className="flex items-center gap-2 rounded bg-white px-2 py-1">
      <img
        src="/coin.png"
        alt="Coin Status"
        width={20}
        height={20}
      />

      <div className="min-w-[130px] flex-1 font-semibold">500</div>

      <button>
        <TfiReload className="h-5 w-5 text-[#0372BA]" />
      </button>
    </div>
  )
}
