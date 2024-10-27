import { Link } from '@remix-run/react'

import { PromotionIcon, ReferralIcon } from '@/components/icons'
import { useActiveStyle } from '@/layouts/default'
import makeStyle from '@/libs/make-style'
import { hexOf } from '@/utils'

import { menuItems } from './data'

export const HeaderSecondary = () => {
  const { data } = useActiveStyle()

  const style = makeStyle(data.data).get('desktop_homepage_gameCategoryContent')
  return (
    <div
      className=""
      style={
        style.style_options === 'color'
          ? {
              backgroundColor: hexOf(
                style.category_list_background_image
              ).withOpacity(style.category_list_background_opacity)
            }
          : {
              backgroundImage: `url(${style.category_list_background_image})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: '100% 100%'
            }
      }
    >
      <ul className="flex justify-center py-4">
        {menuItems.map((menu) => (
          <li
            key={menu.id}
            className="px-9 text-[#02054E] hover:text-[#5056E4]"
          >
            <Link
              to={menu.url}
              className="flex flex-col items-center"
            >
              <menu.icon />
              {menu.title}
            </Link>
          </li>
        ))}

        <li className="border-l-2 border-[#02054E] px-9 text-[#02054E] hover:text-[#5056E4]">
          <Link
            to="/promotion"
            className="flex flex-col items-center"
          >
            <PromotionIcon />
            Promotion
          </Link>
        </li>
        <li className="px-9 text-[#02054E] hover:text-[#5056E4]">
          <Link
            to="/promotion"
            className="flex flex-col items-center"
          >
            <ReferralIcon />
            Referral
          </Link>
        </li>
      </ul>
    </div>
  )
}
