import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getGamesAmerica, GameUS } from 'nintendo-switch-eshop'

export const loadGames = createAsyncThunk('games/loadGames', async () => {
  return await getGamesAmerica()
})

export const gameSlice = createSlice<{ loading: boolean; games: GameUS[] }, {}, 'Games'>({
  name: 'Games',
  initialState: {
    loading: true,
    games: []
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadGames.fulfilled, (state, { payload }) => {
      state.games = payload.filter(game => {
        const date = new Date()
        return (
          game.platform == 'Nintendo Switch' && new Date(game.releaseDateDisplay).getFullYear() == date.getFullYear()
        )
      })
      state.loading = false
    })
  }
})

export default gameSlice.reducer
