import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node'
import { XiorError } from 'xior'
import { ZodError } from 'zod'

import { loginRequest } from '@/layouts/default'
import {
  generateRefreshTokenCookie,
  generateToken2Cookie,
  generateTokenCookie
} from '@/libs/token'
import { loginSchema } from '@/schemas/auth'
import { hashText } from '@/utils'

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const body = await request.formData()
    const username = body.get('username')
    const password = body.get('password')
    const captcha_solution = body.get('captcha_solution')
    const captcha_id = body.get('captcha_id')
    const remember = body.get('remember') === 'true' ? true : false

    const validated = loginSchema.safeParse({
      captcha_solution,
      captcha_id,
      username,
      password,
      remember
    })

    if (validated.error) {
      return new Response(JSON.stringify(validated.error), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } else {
      const hash = hashText({
        ...validated.data
      })
      const payload = {
        ...validated.data,
        hash
      }
      const { data } = await loginRequest(payload)

      const {
        token,
        token2,
        refresh_token: refreshToken,
        hash: hashResponse
      } = data
      const preHash = {
        refresh_token: refreshToken || undefined,
        token,
        token2
      }
      if (!preHash.refresh_token) delete preHash.refresh_token

      const confirmHash = hashText(preHash)
      if (confirmHash === hashResponse) {
        const tokenCookie = generateTokenCookie({
          remember,
          token
        })
        const token2Cookie = generateToken2Cookie({
          remember,
          token: token2
        })

        const refreshTokenCookie = generateRefreshTokenCookie({
          remember,
          token
        })
        const headers = new Headers()
        headers.append('Set-Cookie', tokenCookie)
        headers.append('Set-Cookie', token2Cookie)
        headers.append('Set-Cookie', refreshTokenCookie)

        // Return a JSON response
        return json({ success: true }, { headers })
      }
    }
  } catch (error) {
    if (error instanceof XiorError && error?.response?.status === 401) {
      return json(
        {
          success: false,
          message: 'Invalid credentials'
        },
        {
          status: error?.response?.status
        }
      )
    } else if (error instanceof ZodError) {
      return json(
        {
          success: false,
          message: 'Validation error'
        },
        {
          status: 400
        }
      )
    } else {
      return json({
        success: false,
        message: 'Internal server error'
      })
    }
  }
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  if (request.method !== 'POST') {
    return new Response(null, {
      status: 303,
      headers: {
        Location: '/'
      }
    })
  } else {
    return null
  }
}
