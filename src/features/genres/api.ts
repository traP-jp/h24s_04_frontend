import { isDev } from '@/lib/env'
import type { Genre } from './type'
import ky from 'ky'

const sampleGenres: Genre[] = [
  {
    id: '1',
    genrename: 'SysAd'
  },
  {
    id: '2',
    genrename: 'Game'
  },
  {
    id: '3',
    genrename: '講習会'
  },
  {
    id: '4',
    genrename: 'らんぷろ'
  }
]

export const fetchGenres = async () => {
  if (isDev()) {
    return sampleGenres
  }
  const res: Genre[] = await ky.get('/api/genres').json()
  return res
}
