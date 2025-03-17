import Follower from "../follower/Follower";
import VacationBase from "./VacationBase";

export default interface Vacation extends VacationBase {
    id: string
    Follower: Follower[]
    imageUrl: string
}