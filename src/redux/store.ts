import {configureStore} from '@reduxjs/toolkit'
import { api } from './api/apiSlice';
import userSlice from './user/userSlice';
import filterReducer from './filter/filterSlice';

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        user: userSlice,
        search: filterReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),

});

export type RootState = ReturnType<typeof store.getState>
export type  AppDispatch = typeof store.dispatch

export default store;