import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'

import { PromotionIcon, ReferralIcon } from '@/components/icons'
import { useActiveStyle, PlayNowCard } from '@/layouts/default'
import { convertHex, extractStyle } from '@/utils'

import { menuItems } from './data'

export const HeaderSecondary = () => {
  const { data } = useActiveStyle()

  const styles = extractStyle(data.data).get(
    'desktop_homepage_gameCategoryContent'
  )
  return (
    <nav
      className="flex justify-start overflow-x-auto bg-center scrollbar-thin scrollbar-thumb-black/80 md:justify-center"
      style={{
        ...(styles.style_options === 'color'
          ? { backgroundColor: styles.category_list_background_color }
          : {
              backgroundImage: `url(${styles.category_list_background_image})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat'
            }),
        borderColor: styles.category_list_background_border_color
      }}
    >
      {menuItems.map((menu) => (
        <Popover
          className="relative"
          key={menu.id}
        >
          {({ open }) => (
            <>
              <PopoverButton
                style={{
                  backgroundColor: open
                    ? convertHex(
                        styles.category_list_icon_selected_box_color
                      ).withOpacity(
                        styles.category_list_icon_selected_box_opacity
                      )
                    : undefined,
                  color: styles.category_list_icon_color
                }}
                className={({ active }) =>
                  twMerge([
                    'flex max-w-28 flex-col items-center gap-2 rounded px-12 py-4 text-sm text-[#02054E] focus:bg-black/50 focus:outline-none',
                    active ? 'text-[#5056E4] outline-none ring-0' : ''
                  ])
                }
              >
                <menu.icon />
                {menu.title}
              </PopoverButton>
              <PopoverPanel
                anchor="bottom start"
                transition
                className="absolute top-full flex h-auto w-full origin-top flex-wrap justify-center gap-6 bg-black/50 py-4 transition duration-700 ease-in-out data-[closed]:h-0 data-[closed]:opacity-0"
              >
                {open &&
                  menu.children.map((child) => (
                    <PlayNowCard
                      key={child.id}
                      {...child}
                    />
                  ))}
              </PopoverPanel>
            </>
          )}
        </Popover>
      ))}
      <div className="mx-2 hidden h-14 w-0.5 self-center bg-gray-400 md:block"></div>
      <Popover>
        <PopoverButton
          style={{ color: styles.category_list_icon_color }}
          className="flex max-w-24 flex-col items-center gap-2 rounded px-8 py-4 text-sm text-[#02054E] focus:bg-black/50 focus:outline-none"
        >
          <PromotionIcon />
          Promotion
        </PopoverButton>
      </Popover>
      <Popover>
        <PopoverButton
          style={{ color: styles.category_list_icon_color }}
          className="flex max-w-24 flex-col items-center gap-2 rounded px-8 py-4 text-sm text-[#02054E] focus:bg-black/50 focus:outline-none"
        >
          <ReferralIcon />
          Referral
        </PopoverButton>
      </Popover>
    </nav>
  )
}
