import { createAsyncThunk, createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'
import { getGamesAmerica, GameUS } from 'nintendo-switch-eshop'

type TState = {
  loading: boolean
  games: GameUS[]
  gamesFiltered: GameUS[]
}

const FILTER_INITIAL: TFilter = {
  categorySelected: 'Adventure',
  priceSelected: { amounts: [50, Infinity] }
}

function filterGames(games: GameUS[], { categorySelected, priceSelected }: TFilter) {
  const category = categorySelected || FILTER_INITIAL.categorySelected
  const price = priceSelected?.amounts || FILTER_INITIAL.priceSelected.amounts

  const _games = games.filter(game => {
    const isPriceInRange = game.msrp >= price[0] && game.msrp <= price[1]
    return game.genres.includes(category) && isPriceInRange
  })

  return _games
}

export const loadGames = createAsyncThunk('games/loadGames', async () => {
  return await getGamesAmerica()
})

export const gameSlice = createSlice<TState, any, 'Games'>({
  name: 'Games',
  initialState: {
    loading: true,
    games: [],
    gamesFiltered: []
  },
  reducers: {
    filter(state: TState, { payload }: PayloadAction<TFilter>) {
      state.gamesFiltered = filterGames(state.games, payload)
    },
    resetFilter(state: TState) {
      state.gamesFiltered = filterGames(state.games, FILTER_INITIAL)
    }
  },
  extraReducers(builder) {
    builder.addCase(loadGames.fulfilled, (state, { payload }) => {
      const date = new Date()

      // TODO: crear un servicio para realizar el ordenamiento y agrupamiento de juegos de manera optima
      let gamesSorted: GameUS[] = payload.filter(game => {
        const gameYear = new Date(game.releaseDateDisplay).getFullYear()
        const years = Array(10)
          .fill(null)
          .map((_, i) => date.getFullYear() - i)
        const isLastYear = years.includes(gameYear)
        return game.platform == 'Nintendo Switch' && game.msrp && isLastYear
      })

      gamesSorted = gamesSorted.sort((a, b) => {
        const getTime = (date: string): number => new Date(date).getTime()
        return getTime(b.releaseDateDisplay) - getTime(a.releaseDateDisplay)
      })

      state.gamesFiltered = filterGames(gamesSorted, FILTER_INITIAL)
      state.games = gamesSorted
      state.loading = false
    })

    builder.addCase(loadGames.rejected, (state, action) => {
      console.log(state, action)
    })
  }
})

export const { filter, resetFilter } = gameSlice.actions

export default gameSlice.reducer
