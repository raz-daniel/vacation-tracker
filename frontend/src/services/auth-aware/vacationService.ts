import Vacation from "../../models/vacation/Vacation";
import VacationDraft from "../../models/vacation/VacationDraft";
import Pagination from "../../types/Pagination";
import AuthAware from "./AuthAware";

const defaultPage = 1;
const defaultLimit = 10;

export default class VacationService extends AuthAware {

    async getAllVacations(page = defaultPage, limit = defaultLimit): Promise<Pagination<Vacation>> {
        const response = await this.axiosInstance.get<Pagination<Vacation>>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations?page=${page}&limit=${limit}`);
        return response.data;
    }

    async getFollowedVacations(page = defaultPage, limit = defaultLimit): Promise<Pagination<Vacation>> {
        const response = await this.axiosInstance.get<Pagination<Vacation>>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations/follower?page=${page}&limit=${limit}`);
        return response.data;
    }

    async getUpcomingVacations(page = defaultPage, limit = defaultLimit): Promise<Pagination<Vacation>> {
        const response = await this.axiosInstance.get<Pagination<Vacation>>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations/upcoming?page=${page}&limit=${limit}`);
        return response.data;
    }

    async getCurrentVacations(page = defaultPage, limit = defaultLimit): Promise<Pagination<Vacation>> {
        const response = await this.axiosInstance.get<Pagination<Vacation>>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations/current?page=${page}&limit=${limit}`);
        return response.data;
    }

    async addVacation(vacationDraft: VacationDraft): Promise<Vacation> {
        const formData = new FormData();
        formData.append('destination', vacationDraft.destination);
        formData.append('description', vacationDraft.description);
        formData.append('beginDate', vacationDraft.beginDate.toISOString());
        formData.append('endDate', vacationDraft.endDate.toISOString());
        formData.append('price', vacationDraft.price.toString());

        // Change the field name from imageFile to image
        if (vacationDraft.imageFile) {
            formData.append('image', vacationDraft.imageFile);
        }

        const response = await this.axiosInstance.post<Vacation>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations`, formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
        return response.data;
    }

    async updateVacation(id: string, formData: FormData): Promise<Vacation> {
        const response = await this.axiosInstance.put<Vacation>(
            `${import.meta.env.VITE_REST_SERVER_URL}/vacations/${id}`, 
            formData, 
            {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            }
        );
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