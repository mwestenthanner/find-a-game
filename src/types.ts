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
    comingSoon: boolean
    leavingSoon: boolean
}

export interface FilterGroup {
    scoreMin: number
    scoreMax: number
    playtimeMin: number
    playtimeMax: number
    platforms: Array<string>
    genres: Array<string>
    comingSoon: boolean
    leavingSoon: boolean
}