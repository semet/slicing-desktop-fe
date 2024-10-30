import {
  HeaderCenterLeft,
  HeaderCenterRight,
  useActiveStyle
} from '@/layouts/default'
import { convertHex, extractStyle } from '@/utils'

export const HeaderCenter = () => {
  const { data } = useActiveStyle()

  const style = extractStyle(data.data).get('desktop_homepage_header')
  return (
    <div
      style={
        style.style_options === 'color'
          ? {
              backgroundColor: convertHex(style.background_color).withOpacity(
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
      className="flex flex-col justify-between px-4 py-4 md:flex-row lg:px-6"
    >
      <HeaderCenterLeft />
      <HeaderCenterRight />
    </div>
  )
}
