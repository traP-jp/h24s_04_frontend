import { sleep } from '@/lib/mockUtils'
import type { Genre } from './type'
import ky from 'ky'

const sampleGenres: Genre[] = [
  {
    id: '1',
    name: 'SysAd'
  },
  {
    id: '2',
    name: 'Game'
  },
  {
    id: '3',
    name: '講習会'
  },
  {
    id: '4',
    name: 'らんぷろ'
  }
]

export const fetchGenres = async () => {
  await sleep(1000)
  return sampleGenres

  const res: Genre[] = await ky.get('/genres').json()
  return res
}