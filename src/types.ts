export interface Game {
    id: number
    title: string
    img: string
    description: string
    platform: string
    xcloud: boolean
    genre: Array<string>
    score: number
    playtime: number
}