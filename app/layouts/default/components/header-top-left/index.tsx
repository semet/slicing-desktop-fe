import { BullHorn } from '@/components/icons'

export const HeaderTopLeft = () => {
  return (
    <div className="flex flex-1 items-center">
      <BullHorn />
      <div className="mx-4 w-full overflow-hidden text-sm text-white">
        <div className="w-full animate-marquee">
          Welcome to Lorem ipsum dolor sit amet . lorem ipsum dolor sit amet
          lorem ipsum dolor sit amet dolor sit amet .
        </div>
      </div>
    </div>
  )
}
