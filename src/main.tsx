import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import Loading from './components/loading'
import './plugins/fontawesome'
import '@assets/css/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <Loading />
    </React.StrictMode>
  </Provider>
)
