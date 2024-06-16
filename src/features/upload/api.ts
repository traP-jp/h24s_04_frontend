import { isDev } from '@/lib/env'
import type { Data, Response } from './type'
import ky from 'ky'

export const registerSlide = async (
  title: string,
  description: string,
  selectedGenre: string,
  file: File
) => {
  if (isDev()) {
    return
  }
  const res = await uploadFile(file)

  const data: Data = {
    title,
    description,
    genre_id: selectedGenre,
    dl_url: res.url,
    filepath: res.path
  }

  await ky.post('/api/slides', { json: data })
}

export const uploadFile = async (file: File) => {
  if (isDev()) {
    return {
      url: 'https://example.com',
      path: 'https://example.com'
    } satisfies Response
  }
  const formData = new FormData()
  formData.append('file', file)

  const response: Response = await ky.post('/api/upload', { body: formData }).json()

  return response
}
