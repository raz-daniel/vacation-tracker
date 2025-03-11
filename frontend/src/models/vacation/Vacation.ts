import VacationDraft from "./VacationDraft";

export default interface Vacation extends VacationDraft {
    id: string
    followersCount?: number
    isFollowing?: boolean
    createdAt?: string
    updatedAt?: string
}