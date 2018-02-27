const login = (username, password) => ( // actions return a plain object with a type and payload
  {
    type: 'LOGIN',
    payload: {
      username: username,
      password: password
    }
  }
)

export const signup = (email, password, role, firstName, lastName, zipCode, bio) => (
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
      role: role
    }
  }
)

export default login;

