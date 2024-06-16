import { isDev } from '@/lib/env'
import type { Data, Response } from './type'
import ky from 'ky'
import type { SlideDetail } from '@/features/slideDetail/type'

export const registerSlide = async (
  title: string,
  description: string,
  selectedGenre: string,
  file: File,
  thumbnail: Blob
) => {
  if (isDev()) {
    return
  }
  const res = await uploadFile(file, thumbnail)

  const data: Data = {
    title,
    description,
    genre_id: selectedGenre,
    dl_url: res.dl_url,
    thumb_url: res.thumb_url,
    filepath: res.path
  }

  const res2: SlideDetail = await ky.post('/api/slides', { json: data }).json()
  return res2.id
}

export const uploadFile = async (file: File, thumbnail: Blob) => {
  if (isDev()) {
    return {
      dl_url: 'https://example.com',
      thumb_url: 'https://example.com',
      path: 'https://example.com'
    } satisfies Response
  }
  const formData = new FormData()
  formData.append('file', file)
  formData.append('thumb', thumbnail)

  const response: Response = await ky.post('/api/upload', { body: formData }).json()

  return response
}
