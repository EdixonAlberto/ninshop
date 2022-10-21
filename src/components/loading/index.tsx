import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './loading.css'
import { loadGames } from '@app/store'
import App from '../../App'

function Loading() {
  const dispatch = useDispatch()
  // const { loading } = useSelector((state: RootState) => state.games)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // dispatch(loadGames())
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])

  return (
    <div className={loading ? '' : 'loading-stop'}>
      <div className="loading">
        <section className="controls">
          <div className="control left">
            <div className="joystick"></div>
          </div>

          <div className="control right">
            <div className="joystick"></div>
          </div>
        </section>

        <section className="progress-bar">
          <div className="bar"></div>
          <p>Loading</p>
        </section>
      </div>

      <App />
    </div>
  )
}

export default Loading
