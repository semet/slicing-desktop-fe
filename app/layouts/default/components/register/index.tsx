import { twMerge } from 'tailwind-merge'

import { useActiveStyle } from '@/layouts/default'
import { extractStyle } from '@/utils'

import css from './index.module.css'
import { makeRegisterButtonStyle } from './style'

export const Register = () => {
  const { data } = useActiveStyle()

  const registerStylesRaw = extractStyle(data.data).get(
    'desktop_button_register'
  )
  const registerButtonStyle = makeRegisterButtonStyle(registerStylesRaw)
  return (
    <button
      className={twMerge([
        'min-w-32 rounded-full py-2 font-semibold',
        css.registerButton
      ])}
      style={registerButtonStyle}
    >
      Daftar
    </button>
  )
}
