import {Component} from 'react'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', isStarred: false, appointmentList: []}

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onChangeTitle = event => this.setState({title: event.target.value})

  starredList = () => {
    const {appointmentList} = this.state
    const filteredList = appointmentList.filter(
      eachAppointment => eachAppointment.isStarred === true,
    )
    this.setState({appointmentList: filteredList})
  }

  starred = appointmentId => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (eachAppointment.id === appointmentId) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date, isStarred} = this.state

    const newAppointment = {id: v4(), title, date, isStarred}

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  renderAppointments = () => {
    const {appointmentList} = this.state

    const rendered = appointmentList.map(eachAppointment => (
      <AppointmentItem
        key={eachAppointment.id}
        eachAppointment={eachAppointment}
        starred={this.starred}
      />
    ))

    return rendered
  }

  render() {
    const {title, date} = this.state

    return (
      <div className="background-container">
        <div className="white-container">
          <div className="add-appointment-container">
            <form className="form" onSubmit={this.onAddAppointment}>
              <h1>Add Appointment</h1>
              <div className="title-container">
                <label htmlFor="title" className="title-label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  className="tile-input"
                  value={title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="appointment-date-container">
                <label htmlFor="aptdate" className="date-label">
                  DATE
                </label>
                <input
                  type="date"
                  id="aptdate"
                  className="date-input"
                  placeholder="Title"
                  value={date}
                  onChange={this.onChangeDate}
                />
              </div>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="appointment-img"
              alt="appointments"
            />
          </div>
          <hr className="horizontalLine" />
          <div className="appointments-container">
            <div className="appointment-heading">
              <h1>Appointments</h1>
              <button
                type="button"
                className="starredButton"
                onClick={this.starredList}
              >
                Starred
              </button>
            </div>
            <ul className="unordered-list-container">
              {this.renderAppointments()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
