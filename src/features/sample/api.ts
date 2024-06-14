import type { Sample } from './type'
import ky from 'ky'

export const fetchSample = async () => {
  const res: Sample = await ky.get('https://example.com').json()
  return res.sample
}
