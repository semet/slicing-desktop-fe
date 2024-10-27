import xior, { merge } from 'xior'

const HttpClient = () => {
  const baseURL = process.env.API_URL
  const apiKey = process.env.API_KEY

  const instance = xior.create({
    baseURL
  })

  instance.interceptors.request.use((config) => {
    if (apiKey) {
      config.headers['x-data-reference'] = apiKey
    }

    return merge(config, {
      headers: {
        ...(apiKey && { 'x-data-reference': apiKey }),
        'x-device': config.headers['x-device'] ?? 'desktop'
      }
    })
  })

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return instance
}

export default HttpClient
