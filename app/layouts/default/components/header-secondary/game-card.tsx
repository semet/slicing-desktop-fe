import { FC } from 'react'

import { useActiveStyle } from '@/layouts/default'
import extractStyle from '@/libs/make-style'
import { hexOf } from '@/utils'

type TProps = {
  image: string
}

export const GameCard: FC<TProps> = ({ image }) => {
  const { data } = useActiveStyle()

  const styles = extractStyle(data.data).get(
    'desktop_homepage_gameCategoryContent'
  )
  return (
    <div
      className="group relative h-28 w-60 overflow-hidden rounded-xl border-2 bg-cover"
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        borderColor: hexOf(styles.provider_box_border_color).withOpacity(
          styles.provider_box_border_opacity
        )
      }}
    >
      <div className="absolute inset-0 h-full -translate-y-full transform bg-black/50 transition-transform duration-500 ease-in-out group-hover:translate-y-0" />
      <button className="absolute bottom-2 right-2 min-w-32 rounded-full bg-yellow-400 py-1 text-center font-semibold text-gray-800 hover:bg-yellow-600">
        Play now
      </button>
    </div>
  )
}
