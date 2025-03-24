// export type Language = 'English' | 'French

export type Book =   {
  adult: boolean,
  genre_ids: number[ ],
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  release_date: string,
  title: string,
  word_count: number,
  page_count: number
}