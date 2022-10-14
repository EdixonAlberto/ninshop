import { configureStore } from '@reduxjs/toolkit'
import gameReducer from '../features/games/gameSlice'

export const store = configureStore({
  reducer: {
    games: gameReducer
  }
})
