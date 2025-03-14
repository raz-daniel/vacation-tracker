// src/redux/vacationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Vacation from "../models/vacation/Vacation";

interface VacationState {
    vacations: Vacation[];
    followedVacations: string[]; // IDs of vacations the user follows
    loading: boolean;
    error: string | null;
}

const initialState: VacationState = {
    vacations: [],
    followedVacations: [],
    loading: false,
    error: null
};

export const vacationSlice = createSlice({
    name: 'vacations',
    initialState,
    reducers: {
        setVacations: (state, action: PayloadAction<Vacation[]>) => {
            state.vacations = action.payload;
        },
        addVacation: (state, action: PayloadAction<Vacation>) => {
            state.vacations.push(action.payload);
        },
        updateVacation: (state, action: PayloadAction<Vacation>) => {
            const index = state.vacations.findIndex(v => v.id === action.payload.id);
            if (index !== -1) {
                state.vacations[index] = action.payload;
            }
        },
        removeVacation: (state, action: PayloadAction<string>) => {
            state.vacations = state.vacations.filter(v => v.id !== action.payload);
        },
        setFollowedVacations: (state, action: PayloadAction<string[]>) => {
            state.followedVacations = action.payload;
        },
        followVacation: (state, action: PayloadAction<string>) => {
            if (!state.followedVacations.includes(action.payload)) {
                state.followedVacations.push(action.payload);
            }
        },
        unfollowVacation: (state, action: PayloadAction<string>) => {
            state.followedVacations = state.followedVacations.filter(id => id !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
});

export const { 
    setVacations, 
    addVacation, 
    updateVacation, 
    removeVacation,
    setFollowedVacations,
    followVacation,
    unfollowVacation,
    setLoading,
    setError
} = vacationSlice.actions;

export default vacationSlice.reducer;