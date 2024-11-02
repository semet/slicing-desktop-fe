import { Fragment } from 'react'

import { useGetPlayer } from '@/features/player'
import { Deposit, useActiveStyle, WithDraw } from '@/layouts/default'
import { convertHex, extractStyle } from '@/utils'

export const HeaderBottom = () => {
  const { data: playerData } = useGetPlayer()
  const { data: styleData } = useActiveStyle()

  const style = extractStyle(styleData?.data).get(
    'desktop_homepage_headerMainBox'
  )
  return (
    <Fragment>
      {playerData !== undefined ? (
        <div
          className="flex justify-end gap-4 px-6 py-2"
          style={
            style?.style_options === 'color'
              ? {
                  backgroundColor: convertHex(
                    style?.background_color
                  ).withOpacity(style?.background_opacity)
                }
              : {
                  backgroundImage: `url(${style?.background_image})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: '100% 100%'
                }
          }
        >
          <Deposit />
          <WithDraw />
        </div>
      ) : null}
    </Fragment>
  )
}
