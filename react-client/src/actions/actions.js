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

export const fetchEvents = () => (
  {
    type: 'FETCH-EVENTS'
  }
)
export default { login, logout, signup, fetchEvents };
