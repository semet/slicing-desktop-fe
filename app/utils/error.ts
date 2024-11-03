import { XiorError } from 'xior'
import { ZodError } from 'zod'

export function handleError(error: unknown): never {
  if (error instanceof XiorError) {
    const status = error.response?.status || 500
    const message =
      error.response?.data?.message || 'An error occurred while fetching '
    throw new Error(JSON.stringify({ status, message }))
  } else if (error instanceof ZodError) {
    throw new Error(
      JSON.stringify({
        status: 400,
        message: 'Failed to parse data. Please check the schema'
      })
    )
  } else {
    throw new Error(
      JSON.stringify({
        status: 500,
        message: 'Failed to fetch data. Please try again'
      })
    )
  }
}
