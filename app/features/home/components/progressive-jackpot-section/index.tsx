import { useEffect, useState } from 'react'

import { useActiveLanguage, useActiveStyle } from '@/layouts/default'
import { currencyFormatter, extractStyle } from '@/utils'

import { makeJackpotContainerStyles } from './style'

export const ProgressiveJackpotSection = () => {
  const [addNumber, setAddNumber] = useState<number>(0)
  const { data: styleData } = useActiveStyle()
  const { data: languageData } = useActiveLanguage()

  useEffect(() => {
    const interval = setInterval(() => {
      const epochTimeInMilliseconds = Math.floor(Date.now() / 1000)
      const epochMod = (epochTimeInMilliseconds % 86_400) * 13_100
      const rand = (Math.floor(Math.random() * 999_999) + 1) / 100

      setAddNumber(epochMod + rand)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const styles = extractStyle(styleData?.data).get(
    'desktop_homepage_progressiveJackpot'
  )
  const jackpotContainerStyles = makeJackpotContainerStyles(styles)

  return (
    <div
      className="flex flex-1 flex-col"
      style={jackpotContainerStyles}
    >
      <div
        className="mx-4 mt-4 flex h-[193px] items-center justify-center bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${styles?.jackpot_background_image}')`
        }}
      >
        <p
          className="mx-auto text-center text-2xl font-bold tracking-widest text-white sm:text-4xl md:text-6xl"
          id="jackpot"
          style={{
            color: styles?.jackpot_text_color,
            textShadow:
              '2px 0 #A80C14, -2px 0 #A80C14, 0 2px #A80C14, 0 -2px #A80C14, 1px 1px #A80C14, -1px -1px #A80C14, 1px -1px #A80C14, -1px 1px #A80C14, 8px 2px 0px #000'
          }}
        >
          {addNumber &&
            currencyFormatter(
              Number(languageData?.data?.progresive_jackpot) + addNumber
            )}
        </p>
      </div>
    </div>
  )
}
