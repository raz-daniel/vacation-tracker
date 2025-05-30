// src/redux/vacationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Vacation from "../models/vacation/Vacation";
import User from "../models/user/User";

export enum FilterType {
    ALL = 'all',
    FOLLOWED = 'followed',
    UPCOMING = 'upcoming',
    CURRENT = 'current'
}

interface VacationState {
    vacations: Vacation[]
    loading: boolean
    error: string | null
    filterType: FilterType
}

const initialState: VacationState = {
    vacations: [],
    loading: false,
    error: null,
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

        toggleVacationFollow: (state, action: PayloadAction<{vacationId: string, userId: string}>) => {
            const { vacationId, userId } = action.payload;
            const vacation = state.vacations.find(v => v.id === vacationId);
            
            if (vacation && vacation.followers) {
                // Check if user is already following
                const userIndex = vacation.followers.findIndex(f => f.id === userId);
                
                if (userIndex !== -1) {
                    // User is following, remove them
                    vacation.followers.splice(userIndex, 1);
                } else {
                    // User is not following, add them
                    vacation.followers.push({ id: userId } as User);
                }
            }
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
    toggleVacationFollow
} = vacationSlice.actions;

export default vacationSlice.reducer;