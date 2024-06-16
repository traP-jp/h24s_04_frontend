import type { Data, Response } from './type'
import ky from 'ky'

export const registerSlide = async (
  title: string,
  description: string,
  selectedGenre: string,
  file: File
) => {
  // 'multipart/form-data'
  const formData = new FormData()
  formData.append('file', file)
  const response: Response = await ky.post('/upload', { body: formData }).json()

  const data: Data = {
    title: title,
    description: description,
    genre_id: selectedGenre,
    url: response.url
  }

  await ky.post('/slides', { json: data })
}
