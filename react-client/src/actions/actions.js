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

export const signup = (email, password, firstName, lastName, bio, role, zipCode, race) => (
  {
    type: 'SIGNUP',
    payload: {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      bio: bio,
      role: role,
      zipCode: zipCode,
      race: race
    }
  }
)

export const fetchEvents = (newEvents) => (
  {
    type: 'FETCH-EVENTS',
    payload: {
      newEvents: newEvents
    }
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
