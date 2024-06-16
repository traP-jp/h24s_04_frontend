import { isDev } from '@/lib/env'
import type { Slide } from './type'
import type { SortType } from '@/views/ListView.vue'
import ky from 'ky'

export const fetchSlide = async (
  selectedTitle: string,
  selectedGenre: string | null,
  sort: SortType
) => {
  const exampleSlides: Slide[] = [
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
  if (isDev()) {
    return exampleSlides
  }

  const params = new URLSearchParams()
  params.append('sort', sort)
  params.append('title', selectedTitle)
  if (selectedGenre !== null) {
    params.append('genre_id', selectedGenre)
  }

  const res: Slide[] = await ky.get(`/api/slides`, { searchParams: params }).json()
  return res
}
