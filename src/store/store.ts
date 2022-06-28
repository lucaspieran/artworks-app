import { configureStore } from '@reduxjs/toolkit';
import artworkSlice from './slices/artwork/artworkSlice';

export const store = configureStore({
  reducer: {
    artworks: artworkSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch