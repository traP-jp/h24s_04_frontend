import type { Slide } from './type'
import ky from 'ky'

export const fetchSlide = async () => {
  const datalist: Slide[] = [
    {
      id: '1',
      dl_url: 'https://example.com',
      thumb_url: 'https://example.com',
      title: 'なろう講習会第一回',
      genre_id: '1',
      posted_at: '2021-10-01T00:00:00.000Z',
      description: 'なろう講習会の第一回のスライド。Webアプリの基本的な概念を説明しています。'
    },
    {
      id: '1',
      dl_url: 'https://example.com',
      thumb_url: 'https://example.com',
      title: 'なろう講習会第一回',
      genre_id: '1',
      posted_at: '2021-10-01T00:00:00.000Z',
      description: 'なろう講習会の第一回のスライド。Webアプリの基本的な概念を説明しています。'
    },
    {
      id: '1',
      dl_url: 'https://example.com',
      thumb_url: 'https://example.com',
      title: 'なろう講習会第一回',
      genre_id: '1',
      posted_at: '2021-10-01T00:00:00.000Z',
      description: 'なろう講習会の第一回のスライド。Webアプリの基本的な概念を説明しています。'
    },
    {
      id: '1',
      dl_url: 'https://example.com',
      thumb_url: 'https://example.com',
      title: 'なろう講習会第一回',
      genre_id: '1',
      posted_at: '2021-10-01T00:00:00.000Z',
      description: 'なろう講習会の第一回のスライド。Webアプリの基本的な概念を説明しています。'
    }
  ]
  return datalist

  const res: Slide[] = await ky.get(`/slides`).json()
  return res
}
