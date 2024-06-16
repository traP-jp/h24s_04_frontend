import type { WithValid } from "@/features/list/type"

export interface SlideDetail {
  id: string
  dl_url: string
  thumb_url: WithValid
  title: string
  genre_id: string
  posted_at: string
  description: WithValid
}

export interface SlideEditRequest {
  title: string
  genre_id: string
  description: string
  url: string
}
