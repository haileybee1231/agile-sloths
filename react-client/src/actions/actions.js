export const login = (username, firstname) => ( // actions return a plain object with a type and payload
  {
    type: 'LOGIN',
    payload: {
      username: username,
      firstname: firstname
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
    type: 'FETCH-RACES',
    payload: races
  }
)

export const saverace = (date, location, office) => (
  {
    type: 'SAVE-RACE',
    payload: {
      date: date,
      location: location,
      office: office
    }
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

export const fetchEventsAction = (newEvents, eventIds, fetchedCount) => {
  return {
    type: 'FETCH-EVENTS',
    payload: {
      newEvents: newEvents,
      eventIds: eventIds,
      fetchedCount: fetchedCount
    }
  }
}

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
      host: event.host,
      firstname: window.localStorage.firstname,
      lastname: window.localStorage.lastname,
    }
  }
)

export const savePollingInfo = results => (
  {
    type: 'SAVE-POLLING-INFO',
    payload: {
      results: results
    }
  }
)

export const saveCandidateInfo = results => (
  {
    type: 'SAVE-CANDIDATE-INFO',
    payload: {
      results: results
    }
  }
)

export const setRacesAndCandidates = (races, candidates) => (
  {
    type: 'SET-RACES-CANDIDATES',
    payload: {
      races: races,
      candidates: candidates
    }
  }
)

export const setCandidateFollowers =  followers => (
  {
    type: 'SET-CANDIDATE-FOLLOWERS',
    payload: {
      followers: followers
    }
  }
)

export const handleFollowAction = user => {
  return {
    type: 'HANDLE-FOLLOW',
    payload: {
      user: user
    }
  }
}

export const setFavoritesFollowers = (fftype, favoritesfollowers) => (
  {
    type: 'SET-FAVORITES-FOLLOWERS',
    payload: {
      fftype: fftype,
      favoritesfollowers: favoritesfollowers
    }
  }
)
