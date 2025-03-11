import Register from "./Register"

export default interface User extends Register {
    id: string
    role: string
    createdAt: string
    updatedAt: string
}