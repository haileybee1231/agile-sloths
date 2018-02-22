const login = (username, password) => ( // actions return a plain object with a type and payload
  {
    type: 'LOGIN',
    payload: {
      username: username,
      password: password
    }
  }
)

export default login;
