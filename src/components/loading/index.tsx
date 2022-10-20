import { useEffect, useState } from 'react'
import './loading.css'

function Loading() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2500)
  }, [])

  return (
    <div className="loading">
      <section className={'joystick ' + (!loading ? 'animate-active' : '')}>
        <div className="sticks stick-l">
          <div className="stick-btn"></div>
        </div>

        <div className="sticks stick-r">
          <div className="stick-btn"></div>
        </div>
      </section>

      <section className="progress-bar">
        <div className={'bar ' + (loading ? 'animate-active' : '')}></div>
        <p className={!loading ? 'animate-active' : ''}>100%</p>
      </section>
    </div>
  )
}

export default Loading
