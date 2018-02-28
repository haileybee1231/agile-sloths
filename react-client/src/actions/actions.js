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
