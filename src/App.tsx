import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { loadGames } from '@app/store'

function App() {
  const dispatch = useDispatch()
  const { games, loading } = useSelector((state: RootState) => state.games)

  function formatPrice(price: number | null): string {
    if (price) {
      let priceStr = price.toString()
      const qtyDecimal = priceStr.search(/\./) > -1 ? priceStr.split('.')[1].length : 0

      if (qtyDecimal === 0) priceStr = priceStr + '00'
      if (qtyDecimal < 2) priceStr = priceStr + '0'

      return `$ ${priceStr}`
    }
    return ''
  }

  // MOUNTED
  useEffect(() => {
    dispatch(loadGames())
  }, [])

  return (
    <div className="app">
      <header>
        <div className="navbar">
          <div className="name"></div>

          <ul>
            <li>Home</li>
            <li>Games</li>
            <li>News</li>
            <li>About</li>
          </ul>

          <div className="avatar"></div>
        </div>

        <h1>Ninten Shop</h1>
        <p>Lorem ipsum dolor sit amet.</p>
      </header>

      <main>
        {loading && <h2 className="loading">loading...</h2>}

        {!loading &&
          games.map(game => {
            return (
              <div className="card" key={game.objectID}>
                <img loading="lazy" src={game.horizontalHeaderImage} alt={game.objectID} />
                <div className="content">
                  <span>{game.title}</span>

                  <div className="stars">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <FontAwesomeIcon key={i} icon="star" />
                      ))}
                  </div>

                  <span>{formatPrice(game.msrp)}</span>
                </div>
              </div>
            )
          })}
      </main>
    </div>
  )
}

export default App
