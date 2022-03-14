export interface Game {
    id: string
    title: string
    img: string
    description: string
    platform: Array<string>
    genres: Array<string>
    score: number
    playtime: number
    added: string
    leaving: string
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
    [key: string]: unknown;
}

export interface MutationBoolean {
    variable: string
    value: boolean
}

export interface MutationNumberArray {
    variable: string
    value: Array<number>
}

export interface MutationString {
    variable: string
    value: string
}