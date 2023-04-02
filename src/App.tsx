import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePagination from 'use-pagination'
// import games from '@assets/games.mock'
import NotImage from '@components/not-image'
import { filter, resetFilter } from '@app/store'

function App() {
  const categories = ['Adventure', 'Action', 'Arcade', 'Role-Playing', 'Platformer']
  const prices = [
    {
      label: 'From 50.00$',
      amounts: [50, Infinity]
    },
    {
      label: 'From 30.00$ to 49.99$',
      amounts: [30, 49.99]
    },
    {
      label: 'From 10.00$ to 29.99$',
      amounts: [10, 29.99]
    },
    {
      label: 'From 0.01$ to 9.99$',
      amounts: [0.01, 9.99]
    }
    // {
    //   label: 'Free',
    //   amounts: [0, 0]
    // }
  ]
  const MAX_BTN_PAGE = 4
  const dispatch = useDispatch()
  const { gamesFiltered } = useSelector((state: RootState) => state.games)
  const pagination = usePagination({
    items: gamesFiltered,
    itemsPerPage: 9,
    initialPage: 1
  })
  const [shapeActive, setShapeActive] = useState<number>(3)
  const [categorySelected, setCategorySelected] = useState<string>('')
  const [priceSelected, setPriceSelected] = useState<object | null>(null)
  const [btnPages, setBtnPages] = useState<number[]>([])

  // METHODS ___________________________________________________________________________________________________________
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

  function backPage() {
    pagination.onPreviousPage()
    const currentPage = pagination.currentPage - 1

    if (currentPage < btnPages.at(0)!) {
      const _btnPages = Array(pagination.maxPages)
        .fill(null)
        .map((_, i) => i + 1)
        .filter(n => n <= currentPage && n >= currentPage - MAX_BTN_PAGE)
      setBtnPages(_btnPages)
    }
  }

  function nextPage() {
    pagination.onNextPage()
    const currentPage = pagination.currentPage + 1

    if (currentPage > btnPages.at(-1)!) {
      const _btnPages = Array(pagination.maxPages)
        .fill(null)
        .map((_, i) => i + 1)
        .filter(n => n >= currentPage && n <= currentPage + MAX_BTN_PAGE)
      setBtnPages(_btnPages)
    }
  }

  function resetGamesFiltered(): void {
    setCategorySelected(categories[0])
    setPriceSelected(prices[0])
    dispatch(resetFilter(null))
  }

  // EVENTS ____________________________________________________________________________________________________________
  useEffect(() => {
    if (categorySelected || priceSelected) {
      dispatch(filter({ categorySelected, priceSelected }))
    }
  }, [categorySelected, priceSelected])

  useEffect(() => pagination.onResetPage(), [gamesFiltered])

  useEffect(() => {
    const pages = Array(pagination.maxPages)
      .fill(null)
      .map((_, i) => i + 1)
      .filter(n => n < MAX_BTN_PAGE)
    setBtnPages(pages)
  }, [pagination.items])

  // TEMPLATE __________________________________________________________________________________________________________

  return (
    <div className="app">
      <header>
        <div className="header-navbar">
          <div className="brand">
            <img src="/control.png" alt="Control Nintendo NES" />
            <h2>NinShop</h2>
          </div>

          <ul>
            <li className="font-normal">Home</li>
            <li className="font-normal active">Games</li>
            <li className="font-normal">News</li>
            <li className="font-normal">About</li>
            <li className="font-normal">Events</li>
            <li className="font-normal">Contact</li>
            <li className="font-normal">Shop</li>
          </ul>

          <div className="tools">
            <FontAwesomeIcon className="n-icon" icon="circle-user" />
            <FontAwesomeIcon className="n-icon" icon="basket-shopping" />
          </div>
        </div>

        <div className="header-banner">
          <h1 className="font-title">Games</h1>
          <p className="font-subtitle">HOME | GAMES</p>
        </div>
      </header>

      <main>
        <section className="category-bar">
          <form>
            <div className="n-select">
              <select
                name="categories"
                id="categories"
                defaultValue={categories[0]}
                onChange={evt => setCategorySelected(evt.target.value)}
              >
                {categories.map((categoryName, i) => (
                  <option key={i} value={categoryName}>
                    {categoryName}
                  </option>
                ))}
              </select>
              <FontAwesomeIcon icon="caret-down" />
            </div>

            <div className="n-select">
              <select
                name="price"
                id="price"
                defaultValue={prices[0].label}
                onChange={evt => setPriceSelected(prices[Number(evt.target.value)])}
              >
                {prices.map((price, i) => (
                  <option key={i} value={i}>
                    {price.label}
                  </option>
                ))}
              </select>
              <FontAwesomeIcon icon="caret-down" />
            </div>

            <div className="n-select">
              {/* TODO: agregar otro filter */}
              <select className="n-select" name="order" id="order">
                <option value="">Descending</option>
              </select>
              <FontAwesomeIcon icon="caret-down" />
            </div>

            <button className="n-button" type="reset" onClick={resetGamesFiltered}>
              <span>Reset Filters</span>
            </button>

            <div className="shapes">
              <FontAwesomeIcon
                className={'n-icon' + (shapeActive === 3 ? ' active' : '')}
                icon="table-cells-large"
                onClick={() => setShapeActive(3)}
              />
              <FontAwesomeIcon
                className={'n-icon' + (shapeActive === 4 ? ' active' : '')}
                icon="table-cells"
                onClick={() => setShapeActive(4)}
              />
            </div>
          </form>
        </section>

        <section className="games-list">
          <div className="items" style={{ gridTemplateColumns: `repeat(${shapeActive}, var(--size-card))` }}>
            {pagination.currentItems.map((game: TGame) => {
              return (
                <div className="card" key={game.objectID}>
                  {game.horizontalHeaderImage ? (
                    <img src={game.horizontalHeaderImage} alt={game.title} />
                  ) : (
                    <NotImage />
                  )}

                  <div className="content">
                    <span className="font-normal title">{game.title}</span>
                    <span className="font-normal">{game.genres.join(', ')}</span>
                    <span className="font-normal">{new Date(game.releaseDateDisplay).getFullYear()}</span>

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
          </div>

          <div className="pagination">
            <div className="content">
              <button className="n-button" onClick={backPage} disabled={!pagination.hasPreviousPage}>
                <span>Back</span>
              </button>

              {btnPages.map(n => (
                <div
                  key={n}
                  className={'n-button page ' + (pagination.currentPage === n && 'active')}
                  onClick={() => pagination.setCurrentPage(n)}
                >
                  <span>{n}</span>
                </div>
              ))}

              {pagination.currentPage !== pagination.maxPages && '...'}

              <button className="n-button" onClick={nextPage} disabled={!pagination.hasNextPage}>
                <span>Next</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
