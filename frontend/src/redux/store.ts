import { configureStore } from '@reduxjs/toolkit';
import { vacationSlice } from './vacationSlice';



const store = configureStore({
    reducer: {
        vacation: vacationSlice.reducer
    }
});

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;