import { useState, useEffect } from 'react'
import { getGamesAmerica, GameUS } from 'nintendo-switch-eshop'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {
  const [games, setGames] = useState<GameUS[]>([])

  async function getGames(): Promise<void> {
    const response = await getGamesAmerica()
    const date = new Date()
    const games = response.filter((game) => {
      return game.platform == 'Nintendo Switch' && new Date(game.releaseDateDisplay).getFullYear() == date.getFullYear()
    })

    setGames(games)
  }

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

  useEffect(() => {
    getGames()
    return () => {}
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
        {!games.length && <h2 className="loading">loading...</h2>}

        {games.length > 0 &&
          games.map((game) => {
            return (
              <div className="card" key={game.objectID}>
                <img loading="lazy" src={game.horizontalHeaderImage} alt={game.objectID} />
                <div className="content">
                  <span>{game.title}</span>

                  <div className="stars">
                    {Array(5)
                      .fill(null)
                      .map((_) => (
                        <FontAwesomeIcon icon="star" />
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
