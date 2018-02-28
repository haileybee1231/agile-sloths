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

export const signup = (email, password, role, firstName, lastName, zipCode, bio, race) => (
  {
    type: 'SIGNUP',
    payload: {
      email: email,
      password: password,
      role: role,
      firstName: firstName,
      lastName: lastName,
      zipCode: zipCode,
      bio: bio,
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
