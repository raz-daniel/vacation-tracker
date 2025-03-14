import AuthAware from "./auth-aware/AuthAware";

export default class FollowerService extends AuthAware {
    async followVacation(vacationId: string): Promise<void> {
        await this.axiosInstance.post(`${import.meta.env.VITE_REST_SERVER_URL}/followers/${vacationId}`);
    }

    async unfollowVacation(vacationId: string): Promise<void> {
        await this.axiosInstance.delete(`${import.meta.env.VITE_REST_SERVER_URL}/followers/${vacationId}`);
    }
}