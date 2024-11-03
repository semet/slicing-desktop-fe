import { FC, useState } from 'react'

import { ModalDialog } from '@/components/ui'
import { TPromotion } from '@/schemas/home'

type TProps = {
  promotions: TPromotion[]
  onChange: (data: TPromotion | null) => void
}

export const PromotionPopup: FC<TProps> = ({ promotions, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <button
        type="button"
        className="bg-indigo-300"
        onClick={(event) => {
          event.preventDefault()
          setIsOpen(true)
        }}
      >
        Select Promo
      </button>
      <ModalDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Select Promotion"
        dialogClassName="pt-28"
        panelClassName="w-[90%] flex flex-col gap-4"
      >
        <div>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <input
                type="radio"
                name="promotion"
                value=""
                onChange={() => {
                  onChange(null)
                }}
              />
              No Promotion
            </li>
            {promotions?.map((promo) => (
              <li
                key={promo.id}
                className="flex items-center gap-2"
              >
                <input
                  type="radio"
                  name="promotion"
                  value={promo.id}
                  onChange={() => {
                    onChange(promo)
                  }}
                />
                {promo.title}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="mx-auto w-min rounded-full bg-blue-700 px-4 py-2 text-white"
        >
          Select
        </button>
      </ModalDialog>
    </>
  )
}
