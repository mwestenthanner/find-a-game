export interface Game {
    id: number
    title: string
    img: string
    description: string
    platform: string
    xcloud: boolean
    genres: Array<string>
    score: number
    playtime: number
}