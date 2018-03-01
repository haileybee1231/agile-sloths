export const login = (username) => ( // actions return a plain object with a type and payload
  {
    type: 'LOGIN',
    payload: {
      username: username
    }
  }
)
export const logout = () => ( // no payload or parameters necessary for logout
  {
    type: 'LOGOUT'
  }
)

export const fetchEvents = () => (
  {
    type: 'FETCH-EVENTS'
  }
)

export const createEvent = (event) => (
  {
    type: 'CREATE-EVENT',
    payload: {
      title: event.title,
      host: event.host,
      location: event.location,
      date: event.date,
      time: event.time,
      description: event.description,
      host: event.host
    }
  }
)
