import axios from "axios"
import Category from "../models/category/Category"


class Categories {

    async getCategories(): Promise<Category[]> {
        const response = await axios.get<Category[]>(`${import.meta.env.VITE_REST_SERVER_URL}/categories`)
        return response.data
    }
}

const categoriesServices = new Categories()
export default categoriesServices