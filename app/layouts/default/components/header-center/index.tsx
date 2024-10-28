import {
  HeaderCenterLeft,
  HeaderCenterRight,
  useActiveStyle
} from '@/layouts/default'
import extractStyle from '@/libs/make-style'
import { hexOf } from '@/utils'

export const HeaderCenter = () => {
  const { data } = useActiveStyle()

  const style = extractStyle(data.data).get('desktop_homepage_header')
  return (
    <div
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
      className="flex justify-between px-6 py-4"
    >
      <HeaderCenterLeft />
      <HeaderCenterRight />
    </div>
  )
}
