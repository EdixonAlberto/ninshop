type TStore = import('../app/store').store

type TootState = ReturnType<typeof TStore.getState>

type AppDispatch = typeof TStore.dispatch
