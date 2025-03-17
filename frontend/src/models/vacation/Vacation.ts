import VacationBase from "./VacationBase";

export default interface Vacation extends VacationBase {
    id: string
    followerCount: number
    isFollowedByCurrentUser: boolean
    imageUrl: string
}