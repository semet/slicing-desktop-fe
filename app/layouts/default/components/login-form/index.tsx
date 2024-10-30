import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useFetcher } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { RxReload } from 'react-icons/rx'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'

import { Checkbox, Input } from '@/components/ui'
import { useActiveStyle, useGetCaptcha } from '@/layouts/default'
import { loginSchema, TLoginForm } from '@/schemas/auth'
import { extractStyle } from '@/utils'

import css from './index.module.css'
import { makeLoginButtonStyle } from './style'

export const LoginForm = () => {
  const [passwordType, setPasswordType] = useState<'text' | 'password'>(
    'password'
  )

  const { data } = useActiveStyle()
  const {
    data: captchaData,
    refetch: reloadCaptcha,
    isLoading: isCaptchaLoading,
    isRefetching: isCaptchaRefetching
  } = useGetCaptcha({
    action: 'login'
  })

  const shouldDisableCaptcha =
    Number(captchaData?.data?.remaining_refresh) < 1 ||
    isCaptchaLoading ||
    isCaptchaRefetching

  const formMethods = useForm<TLoginForm>({
    defaultValues: {
      username: '',
      password: '',
      captcha_solution: '',
      captcha_id: captchaData?.data.captcha_id
    },
    resolver: zodResolver(loginSchema)
  })

  const { handleSubmit } = formMethods
  const fetcher = useFetcher<{ success: boolean; message: string }>()

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data?.success) {
      location.reload()
    }

    if (fetcher.state === 'idle' && !fetcher.data?.success) {
      reloadCaptcha()
      toast.error(fetcher.data?.message)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.data?.success, fetcher.state])
  const onSubmit = handleSubmit((data) => {
    const payload = {
      captcha_id: captchaData?.data.captcha_id,
      captcha_solution: data.captcha_solution,
      username: data.username,
      password: data.password,
      remember: data.remember
    }

    const formData = new FormData()
    formData.append(
      'data',
      JSON.stringify({
        ...payload,
        captcha_id: captchaData?.data.captcha_id
      })
    )
    fetcher.submit(data, {
      method: 'post',
      action: '/login'
    })
  })

  const loginStylesRaw = extractStyle(data.data).get('desktop_button_login')
  const loginButtonStyle = makeLoginButtonStyle(loginStylesRaw)
  return (
    <FormProvider {...formMethods}>
      <fetcher.Form
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
            name="captcha_solution"
            required
            // disabled={shouldDisableCaptcha}
            rightNode={
              <div className="border-l pl-2">
                <img
                  src={captchaData?.data?.data}
                  alt="captcha"
                  className="h-full"
                />
              </div>
            }
          />
          <button
            type="button"
            onClick={() => reloadCaptcha()}
            className="rounded-full bg-orange-600 p-[9px] disabled:cursor-not-allowed disabled:bg-orange-600/50"
            disabled={shouldDisableCaptcha}
          >
            <RxReload
              className={twMerge([
                'text-xl text-white',
                isCaptchaRefetching ? 'animate-spin' : ''
              ])}
            />
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
            'w-full rounded-full py-2 text-center font-semibold',
            css.loginButtonLg
          ])}
          style={loginButtonStyle}
          type="submit"
        >
          Login
        </button>
      </fetcher.Form>
    </FormProvider>
  )
}
