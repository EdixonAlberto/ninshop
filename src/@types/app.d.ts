type RootState = ReturnType<typeof import('@app/store').store.getState>

type AppDispatch = typeof import('@app/store').store.dispatch
