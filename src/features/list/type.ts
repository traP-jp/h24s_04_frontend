export interface Slide {
  id: string
  dl_url: string
  thumb_url: WithValid
  title: string
  genre_id: string
  posted_at: string
  description: WithValid
}

export interface WithValid<T = string> {
  String: T
  Valid: boolean
}
