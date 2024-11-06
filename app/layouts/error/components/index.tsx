import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError
} from '@remix-run/react'
import Cookies from 'js-cookie'
import { FC, useEffect } from 'react'

import { userCredentialKeys } from '@/configs/cookies'

const { token, token2, refreshToken } = userCredentialKeys

type TProps = {
  title: string
}

export const ErrorWrapper: FC<TProps> = ({ title }) => {
  const error = useRouteError()
  const navigate = useNavigate()
  //TODO: Check error code and cause. if its Xior error and the status code is 401, then remove the cookies
  // If not, just show the error message
  useEffect(() => {
    Cookies.remove(token)
    Cookies.remove(token2)
    Cookies.remove(refreshToken)
    setTimeout(() => {
      navigate('/', {
        replace: true
      })
    }, 3000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '60%',
        margin: 'auto',
        overflowX: 'hidden'
      }}
    >
      <h1>{title}</h1>
      {isRouteErrorResponse(error) ? (
        <>
          <h2 className="text-2xl">
            {error.status} {error.statusText}
          </h2>
          <p>{error.data}</p>
        </>
      ) : error instanceof Error ? (
        <>
          <p
            style={{
              color: 'red',
              fontSize: '1.5rem'
            }}
          >
            {error.message}
          </p>
          <p>The stack trace is:</p>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              padding: '1rem'
            }}
          >
            {error.stack}
          </pre>
        </>
      ) : (
        <h1>Unknown Error</h1>
      )}
    </div>
  )
}
