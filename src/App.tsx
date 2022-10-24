import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import games from '@assets/games.mock.json'
import NotImage from '@components/not-image'

function App() {
  // const { games } = useSelector((state: RootState) => state.games)
  const [shapeActive, setShapeActive] = useState(0)

  function formatPrice(price: number | null): string {
    if (price) {
      let priceStr = price.toString()
      const qtyDecimal = priceStr.search(/\./) > -1 ? priceStr.split('.')[1].length : 0

      if (qtyDecimal === 0) priceStr = priceStr + '.00'
      else if (qtyDecimal < 2) priceStr = priceStr + '0'

      return `$${priceStr}`
    }
    return 'Empty'
  }

  function handlerSubmit(evt: any) {
    console.log(evt)
    evt.preventDefault()
  }

  // MOUNTED
  useEffect(() => {}, [])

  return (
    <div className="app">
      <header>
        <div className="navbar">
          <div className="brand">
            <img src="/control.png" alt="Control Nintendo NES" />
            <h2>NinShop</h2>
          </div>

          <ul>
            <li>Home</li>
            <li>Games</li>
            <li>News</li>
            <li>About</li>
            <li>Events</li>
            <li>Contact</li>
            <li>Shop</li>
          </ul>

          <div className="tools">
            <FontAwesomeIcon className="n-icon" icon="circle-user" />
            <FontAwesomeIcon className="n-icon" icon="basket-shopping" />
          </div>
        </div>

        <h1 className="font-title">Shop</h1>
        <p className="font-subtitle">HOME | SHOP</p>
      </header>

      <main>
        <section className="category-bar">
          <form onSubmit={() => handlerSubmit}>
            <div className="n-select">
              <select name="categories" id="categories">
                <option value="">All Categories</option>
              </select>
              <FontAwesomeIcon icon="caret-down" />
            </div>

            <div className="n-select">
              <select className="n-select" name="price" id="price">
                <option value="">Price</option>
              </select>
              <FontAwesomeIcon icon="caret-down" />
            </div>

            <div className="n-select">
              <select className="n-select" name="order" id="order">
                <option value="">Descending</option>
              </select>
              <FontAwesomeIcon icon="caret-down" />
            </div>

            <button className="n-button" type="submit">
              <span>Apply Filters</span>
            </button>

            <div className="shapes">
              <FontAwesomeIcon
                className={'n-icon' + (shapeActive === 0 ? ' active' : '')}
                icon="table-cells-large"
                onClick={() => setShapeActive(0)}
              />
              <FontAwesomeIcon
                className={'n-icon' + (shapeActive === 1 ? ' active' : '')}
                icon="table-cells"
                onClick={() => setShapeActive(1)}
              />
            </div>
          </form>
        </section>

        <section className="games-list">
          {games.map(game => {
            return (
              <div className="card" key={game.objectID}>
                {game.horizontalHeaderImage ? (
                  <img loading="lazy" src={game.horizontalHeaderImage} alt={game.title} />
                ) : (
                  <NotImage />
                )}

                <div className="content">
                  <span className="font-normal title">{game.title}</span>

                  <div className="stars">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <FontAwesomeIcon key={i} icon="star" />
                      ))}
                  </div>

                  <span className="font-normal price">{formatPrice(game.msrp)}</span>
                </div>
              </div>
            )
          })}
        </section>
      </main>
    </div>
  )
}

export default App
