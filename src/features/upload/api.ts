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
  const url = await uploadFile(file)

  const data: Data = {
    title: title,
    description: description,
    genre_id: selectedGenre,
    url: url
  }

  await ky.post('/slides', { json: data })
}

export const uploadFile = async (file: File) => {
  if (isDev()) {
    return 'https://example.com'
  }
  const formData = new FormData()
  formData.append('file', file)

  const response: Response = await ky.post('/api/upload', { body: formData }).json()

  return response.url
}
