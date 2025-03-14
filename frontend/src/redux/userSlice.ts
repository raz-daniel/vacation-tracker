import User from "../models/user/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserState {
    currentUser: User | null
    isAdmin: boolean
}

const initialState: UserState = {
    currentUser: null,
    isAdmin: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload
            state.isAdmin = action.payload.role === 'admin'
        },
        clearUser: (state) => {
            state.currentUser = null
            state.isAdmin = false
        }
    }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer