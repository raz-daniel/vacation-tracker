import Vacation from "../../models/vacation/Vacation";
import VacationDraft from "../../models/vacation/VacationDraft";
import AuthAware from "./AuthAware";

export default class VacationService extends AuthAware {
    async getAllVacations(): Promise<Vacation[]> {
        const response = await this.axiosInstance.get<Vacation[]>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations`);
        return response.data;
    }

    async getFollowedVacations(): Promise<Vacation[]> {
        const response = await this.axiosInstance.get<Vacation[]>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations/follower`);
        return response.data;
    }

    async getUpcomingVacations(): Promise<Vacation[]> {
        const response = await this.axiosInstance.get<Vacation[]>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations/upcoming`);
        return response.data;
    }

    async getCurrentVacations(): Promise<Vacation[]> {
        const response = await this.axiosInstance.get<Vacation[]>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations/current`);
        return response.data;
    }

    async addVacation(vacation: VacationDraft): Promise<Vacation> {
        const response = await this.axiosInstance.post<Vacation>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations`, vacation, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
        })
        return response.data;
    }

    async updateVacation(id: string, vacation: VacationDraft): Promise<Vacation> {
        const response = await this.axiosInstance.put<Vacation>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations/${id}`, vacation, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
    })
        return response.data;
    }

    async deleteVacation(id: string): Promise<void> {
        await this.axiosInstance.delete(`${import.meta.env.VITE_REST_SERVER_URL}/vacations/${id}`);
    }

    async exportVacations(): Promise<Blob> {
        const response = await this.axiosInstance.get(`${import.meta.env.VITE_REST_SERVER_URL}/vacations/export`, {
            responseType: 'blob'
        });
        return response.data;
    }
}