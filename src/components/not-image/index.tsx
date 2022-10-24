import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './not-image.css'

function NotImage() {
  return (
    <div className="not-image">
      <FontAwesomeIcon className="n-icon" icon="ghost" />
      <span className="font-subtitle">Image not available</span>
    </div>
  )
}

export default NotImage
