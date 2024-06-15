
import ky from 'ky'

export const registerSlide = async (
  title: string,
  description: string,
  selectedGenre: string,
  file: File
) => {
  // 'multipart/form-data'
  const formData = new FormData()
  formData.append('title', title)
  formData.append('description', description)
  formData.append('genre_id', selectedGenre)
  formData.append('pdf', file)

   await ky.post('/slides').json()
}
