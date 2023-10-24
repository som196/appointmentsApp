import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, starred} = props
  const {id, title, date, isStarred} = eachAppointment
  const imgUrl = !isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
  const dateValue = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const starClicked = () => {
    starred(id)
  }

  return (
    <li className="list-container">
      <div className="head-starred-container">
        <p>{title}</p>
        <button
          type="button"
          data-testid="star"
          onClick={starClicked}
          className="button-star"
        >
          <img src={imgUrl} alt="star" />
        </button>
      </div>
      <p>{dateValue}</p>
    </li>
  )
}

export default AppointmentItem
