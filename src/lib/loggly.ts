import axios from 'axios'

const loggly = axios.create({
  baseURL:
    'https://logs-01.loggly.com/inputs/ff424bed-98df-4ab6-ac0e-49dc5d9ae378/tag/misc',
})

export const trackWithLoggly = async () => {
  // @ts-ignore
  if (import.meta.env.DEV) return

  const url = window.location.href

  await loggly.post('/', {
    app: 'PrsMrs',
    url,
  })
}
