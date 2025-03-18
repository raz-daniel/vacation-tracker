import VacationBase from "./VacationBase";

export default interface Vacation extends VacationBase {
    id: string;
    imageUrl: string;
    followerCount: number;
    isFollowedByCurrentUser: boolean;
}