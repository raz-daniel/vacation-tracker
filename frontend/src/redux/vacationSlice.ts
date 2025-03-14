// src/redux/vacationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Vacation from "../models/vacation/Vacation";

interface VacationState {
    vacations: Vacation[]
    loading: boolean
    error: string | null
    filterType: 'all' | 'followed' | 'upcoming' | 'current'
}

const initialState: VacationState = {
    vacations: [],
    loading: false,
    error: null,
    filterType: 'all'
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

        setFilterType: (state, action: PayloadAction<'all' | 'followed' | 'upcoming' | 'current'>) => {
            state.filterType = action.payload
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }, 

        updateFollowStatus: (state, action: PayloadAction<{id: string, isFollowing: boolean}>) => {
            const index = state.vacations.findIndex(v => v.id === action.payload.id)
            if (index !== -1) {
                state.vacations[index].isFollowing = action.payload.isFollowing
                if (action.payload.isFollowing) {
                    state.vacations[index].followersCount += 1;
                } else {
                    state.vacations[index].followersCount -= 1;

                }
            }
        }
    }
});

export const { 
    setVacations, 
    addVacation, 
    updateVacation, 
    removeVacation,
    setFilterType,
    setLoading,
    setError,
    updateFollowStatus
} = vacationSlice.actions;

export default vacationSlice.reducer;