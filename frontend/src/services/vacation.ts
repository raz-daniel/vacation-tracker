import Vacation from "../models/vacation/Vacation";
import VacationDraft from "../models/vacation/VacationDraft";
import AuthAware from "./auth-aware/AuthAware";

export default class VacationService extends AuthAware {
    async getAllVacations(): Promise<Vacation[]> {
        const response = await this.axiosInstance.get<Vacation[]>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations`);
        return response.data;
    }

    async getFollowedVacations(): Promise<Vacation[]> {
        const response = await this.axiosInstance.get<Vacation[]>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations/follower`);
        return response.data;
    }

    async addVacation(vacation: VacationDraft): Promise<Vacation> {
        const response = await this.axiosInstance.post<Vacation>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations`, vacation);
        return response.data;
    }

    async updateVacation(id: string, vacation: VacationDraft): Promise<Vacation> {
        const response = await this.axiosInstance.put<Vacation>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations/${id}`, vacation);
        return response.data;
    }

    async deleteVacation(id: string): Promise<void> {
        await this.axiosInstance.delete(`${import.meta.env.VITE_REST_SERVER_URL}/vacations/${id}`);
    }

    async followVacation(id: string): Promise<void> {
        await this.axiosInstance.post(`${import.meta.env.VITE_REST_SERVER_URL}/followers/${id}`);
    }

    async unfollowVacation(id: string): Promise<void> {
        await this.axiosInstance.delete(`${import.meta.env.VITE_REST_SERVER_URL}/followers/${id}`);
    }

    async exportVacations(): Promise<Blob> {
        const response = await this.axiosInstance.get(`${import.meta.env.VITE_REST_SERVER_URL}/vacations/export`, {
            responseType: 'blob'
        });
        return response.data;
    }
}