import { ActionFunctionArgs, json } from '@remix-run/node'
import { XiorError } from 'xior'

import { userCredentialKeys } from '@/configs/cookies'
import HttpServer from '@/libs/http-server'
import { handleToken } from '@/libs/token'
const { token, token2, refreshToken } = userCredentialKeys

export const action = async ({ request }: ActionFunctionArgs) => {
  const { accessToken } = await handleToken(request)
  try {
    const { data } = await HttpServer(accessToken).post('/logout')
    const responseHeaders = new Headers()
    responseHeaders.append(
      'Set-Cookie',
      `${token}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
    )
    responseHeaders.append(
      'Set-Cookie',
      `${token2}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
    )
    responseHeaders.append(
      'Set-Cookie',
      `${refreshToken}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
    )

    return json(
      {
        data,
        message: 'Logout success',
        statusCode: 200,
        success: true
      },
      {
        headers: responseHeaders
      }
    )
  } catch (error: unknown) {
    if (error instanceof XiorError) {
      const { response } = error

      if (response?.data?.error?.code) {
        const errorCode = response.data.error.code

        return json({
          errorCode: errorCode,
          statusCode: response.status,
          message: 'Something went wrong',
          success: false
        })
      }
    }
    return json({
      message: 'Something went wrong',
      statusCode: 500,
      success: false
    })
  }
}
