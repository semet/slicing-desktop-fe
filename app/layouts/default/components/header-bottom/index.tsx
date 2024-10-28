// import { AutoTransfer } from './auto-transfer'
import { Fragment, useState } from 'react'

import { useActiveStyle } from '@/layouts/default'
import extractStyle from '@/libs/make-style'
import { hexOf } from '@/utils'

import { Deposit } from './deposit'
// import { InstantDeposit } from './instant-deposit'
import { WithDraw } from './withdraw'

export const HeaderBottom = () => {
  const [isLogin] = useState<boolean>(false)
  const { data } = useActiveStyle()

  const style = extractStyle(data.data).get('desktop_homepage_headerMainBox')
  return (
    <Fragment>
      {isLogin ? (
        <div
          className="flex justify-end gap-4 px-6 py-2"
          style={
            style.style_options === 'color'
              ? {
                  backgroundColor: hexOf(style.background_color).withOpacity(
                    style.background_opacity
                  )
                }
              : {
                  backgroundImage: `url(${style.background_image})`,
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
