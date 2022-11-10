type RootState = ReturnType<typeof import('@app/store').store.getState>

type AppDispatch = typeof import('@app/store').store.dispatch

type TGames = ReturnType<typeof import('@app/store').store.getState>['games']['games']

type TFilter = {
  categorySelected: string
  priceSelected: { amounts: number[] }
}
