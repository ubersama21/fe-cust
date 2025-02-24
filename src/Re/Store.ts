import { configureStore } from '@reduxjs/toolkit';
import  itemsReducers  from '../Re/ItemsR/itemsReducers'

// Setup store
export const store = configureStore({
    reducer:{
        items: itemsReducers,
    }

});

export type AppDispatch = typeof store.dispatch; // Tipe AppDispatch
export type RootState = ReturnType<typeof store.getState>;
