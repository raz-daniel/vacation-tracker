import Like from "../like/Like";
import VacationBase from "./VacationBase";

export default interface Vacation extends VacationBase {
    id: string
    like: Like[]
    imageUrl: string
}