type RootState = ReturnType<typeof import('@app/store').store.getState>

type AppDispatch = typeof import('@app/store').store.dispatch

type TGame = ReturnType<typeof import('@app/store').store.getState>['games']['games'][0]

type TFilter = {
  categorySelected: string
  priceSelected: { amounts: number[] }
}
