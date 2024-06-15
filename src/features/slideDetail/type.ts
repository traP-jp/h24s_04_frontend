export interface SlideDetail {
  id: string
  dl_url: string
  thumb_url: string
  title: string
  genre_id: string
  posted_at: string
  description: string
}

export interface SlideEditRequest {
  title: string
  genre_id: string
  description: string
}
