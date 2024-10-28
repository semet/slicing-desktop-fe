import { Link } from '@remix-run/react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { ModalDialog } from '@/components/ui'
import { LoginForm, useActiveStyle, makeButtonStyle } from '@/layouts/default'
import extractStyle from '@/libs/make-style'

import css from './css/login.module.css'

export const Login = () => {
  const { data } = useActiveStyle()
  const rawStyles = extractStyle(data.data).get('desktop_button_login')
  const { buttonSm } = makeButtonStyle(rawStyles)

  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <button
        className={twMerge([
          'min-w-32 rounded-full py-2 font-semibold',
          css.loginButton
        ])}
        style={buttonSm}
        onClick={() => setIsOpen(true)}
      >
        Login
      </button>
      <ModalDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Login"
        dialogClassName="pt-40"
        panelClassName="w-[395px] flex flex-col gap-4"
      >
        <LoginForm />
        <div className="inline-flex items-center gap-2">
          <span className="h-0 flex-1 border-b-2 bg-gray-600" />
          <span className="text-gray-600">Atau</span>
          <span className="h-0 flex-1 border-b-2 bg-gray-600" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-600">Belum punya akun?</span>
          <Link
            to="/register"
            className="w-full rounded-full bg-secondary py-2 text-center font-semibold text-white"
          >
            Daftar
          </Link>
        </div>
      </ModalDialog>
    </>
  )
}
