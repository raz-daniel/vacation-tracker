import User from "../user/User";
import VacationBase from "./VacationBase";

export default interface Vacation extends VacationBase {
    id: string;
    imageUrl: string;
    followers?: User[]
}