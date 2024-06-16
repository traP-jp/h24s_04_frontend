import { isDev } from '@/lib/env'
import type { SlideDetail, SlideEditRequest } from './type'
import ky from 'ky'

export const fetchSlideDetail = async (id: string) => {
  const slide: SlideDetail = {
    id: '1',
    dl_url: '/slide.pdf',
    thumb_url: { String: '/slide.png', Valid: true },
    title: 'なろう講習会第一回',
    genre_id: '1',
    posted_at: '2021-10-01T00:00:00.000Z',
    description: {
      String: 'なろう講習会の第一回のスライド。Webアプリの基本的な概念を説明しています。',
      Valid: true
    }
  }
  if (isDev()) {
    return slide
  }

  const res: SlideDetail = await ky.get(`/api/slides/${id}`).json()
  return res
}

export const editSlideDetail = async (id: string, request: SlideEditRequest) => {
  if (isDev()) {
    return
  }
  await ky.patch(`/api/slides/${id}`, { json: request })
}

export const deleteSlideDetail = async (id: string) => {
  if (isDev()) {
    return
  }
  await ky.delete(`/api/slides/${id}`)
}
