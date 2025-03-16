import Register from "./Register"

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin'
}

export default interface User extends Register {
    id: string
    role: UserRole
    createdAt: string
    updatedAt: string
}