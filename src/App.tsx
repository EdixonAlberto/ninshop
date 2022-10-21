import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import games from '@assets/games.mock.json'

function App() {
  // const { games } = useSelector((state: RootState) => state.games)

  function formatPrice(price: number | null): string {
    if (price) {
      let priceStr = price.toString()
      const qtyDecimal = priceStr.search(/\./) > -1 ? priceStr.split('.')[1].length : 0

      if (qtyDecimal === 0) priceStr = priceStr + '.00'
      else if (qtyDecimal < 2) priceStr = priceStr + '0'

      return `$ ${priceStr}`
    }
    return 'Empty'
  }

  // MOUNTED
  useEffect(() => {}, [])

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
        {games.map(game => {
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
