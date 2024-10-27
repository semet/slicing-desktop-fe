import {
  HeaderTopLeft,
  HeaderTopRight,
  useActiveStyle
} from '@/layouts/default'
import makeStyle from '@/libs/make-style'
import { hexOf } from '@/utils'

export const HeaderTop = () => {
  const { data } = useActiveStyle()

  const style = makeStyle(data.data).get('desktop_homepage_announcement')
  return (
    <div
      style={{
        backgroundColor: hexOf(style?.background_color).withOpacity(
          style?.background_opacity
        )
      }}
      className="flex justify-between py-1 pl-28 pr-6"
    >
      <HeaderTopLeft />
      <HeaderTopRight />
    </div>
  )
}
