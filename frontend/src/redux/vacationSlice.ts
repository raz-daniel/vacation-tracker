// src/redux/vacationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Vacation from "../models/vacation/Vacation";

export enum FilterType {
    ALL = 'all',
    LIKE = 'like',
    UPCOMING = 'upcoming',
    CURRENT = 'current'
}

interface VacationState {
    vacations: Vacation[]
    loading: boolean
    error: string | null
    isLike: boolean
    filterType: FilterType
}

const initialState: VacationState = {
    vacations: [],
    loading: false,
    error: null,
    isLike: false,
    filterType: FilterType.ALL
};

export const vacationSlice = createSlice({
    name: 'vacations',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Vacation[]>) => {
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

        setFilterType: (state, action: PayloadAction<FilterType>) => {
            state.filterType = action.payload
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },

        addLike: (state, action: PayloadAction<{ id: string, isLike: boolean }>) => {
            const index = state.vacations.findIndex(v => v.id === action.payload.id)
            if (index !== -1) state.isLike = true
            
        },

        removeLike: (state, action: PayloadAction<{ id: string, isLike: boolean }>) => {
            const index = state.vacations.findIndex(v => v.id === action.payload.id)
            if (index !== -1) state.isLike = true
        }
    }
});

export const {
    init,
    addVacation,
    updateVacation,
    removeVacation,
    setFilterType,
    setLoading,
    setError,
    addLike,
    removeLike
} = vacationSlice.actions;

export default vacationSlice.reducer;