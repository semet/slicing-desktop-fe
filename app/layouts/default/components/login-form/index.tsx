import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@remix-run/react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { RxReload } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'

import { Checkbox, Input } from '@/components/ui'
import { loginSchema, TLoginForm } from '@/schemas/auth'

export const LoginForm = () => {
  const [passwordType, setPasswordType] = useState<'text' | 'password'>(
    'password'
  )
  const formMethods = useForm<TLoginForm>({
    defaultValues: {
      username: '',
      password: '',
      captcha: ''
    },
    resolver: zodResolver(loginSchema)
  })

  const { handleSubmit } = formMethods

  const onSubmit = handleSubmit((data) => {
    // eslint-disable-next-line no-console
    console.dir(data)
  })
  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4"
      >
        <Input<TLoginForm>
          name="username"
          label="Username"
          type="text"
          required
        />
        <Input<TLoginForm>
          name="password"
          label="Password"
          type={passwordType}
          required
          rightNode={
            <button
              type="button"
              className="pl-2 pr-4"
              onClick={() =>
                setPasswordType((prev) => {
                  return prev === 'password' ? 'text' : 'password'
                })
              }
            >
              {passwordType === 'password' ? (
                <AiOutlineEye className="text-xl text-gray-500" />
              ) : (
                <AiOutlineEyeInvisible className="text-xl text-gray-500" />
              )}
            </button>
          }
        />
        <div className="flex items-center justify-between gap-4">
          <Input<TLoginForm>
            name="captcha"
            required
          />
          <button
            type="button"
            className="rounded-full bg-orange-600 p-[9px]"
          >
            <RxReload className="text-xl text-white" />
          </button>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Checkbox<TLoginForm>
            name="remember"
            label="Remember me"
          />
          <Link
            to="/forgot-password"
            className="text-secondary underline"
          >
            Forgot password?
          </Link>
        </div>
        <button
          className={twMerge([
            'w-full rounded-full bg-blue-500 py-2 text-center font-semibold text-white'
          ])}
          type="submit"
        >
          Login
        </button>
      </form>
    </FormProvider>
  )
}
