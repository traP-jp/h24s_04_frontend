import { sleep } from '@/lib/mockUtils'
import type { SlideDetail, SlideEditRequest } from './type'
import ky from 'ky'

export const fetchSlideDetail = async (id: string) => {
  await sleep(1000)
  const slide: SlideDetail = {
    id: '1',
    dl_url: 'https://example.com',
    thumb_url: 'https://example.com',
    title: 'なろう講習会第一回',
    genre_id: '1',
    posted_at: '2021-10-01T00:00:00.000Z',
    description: 'なろう講習会の第一回のスライド。Webアプリの基本的な概念を説明しています。'
  }
  return slide

  const res: SlideDetail = await ky.get(`/slides/${id}`).json()
  return res
}

export const editSlideDetail = async (id: string, request: SlideEditRequest) => {
  await sleep(1000)
  console.log(request)
  return

  await ky.patch(`/slides/${id}`, { json: request })
}
