export const login = username => ( // actions return a plain object with a type and payload
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

export const fetchraces = (races) => (
  {
    type: 'FETCH_RACES',
    payload: races
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

export const fetchEventsAction = newEvents => (
  {
    type: 'FETCH-EVENTS',
    payload: {
      newEvents: newEvents
    }
  }
)
//
export const attendEventAction = (event, user) => (
  {
    type: 'ATTEND-EVENT',
    payload: {
      event: event,
      user: user
    }
  }
)

export const setUser = user => {
  return {
    type: 'SET-USER',
    payload: {
      selectedUser: user
    }
  }
}

export const createEvent = event => (
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
