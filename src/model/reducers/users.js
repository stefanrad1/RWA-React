export default (state = {users: []}, { type, user, users }) => {
  switch (type) {
    case 'ADD_USER': {
      return { users: [...state, user] }
    }
    case 'EDIT_USER': {
      return {
        users: state.map(item => {
          if (item.id === user.id) {
            return user
          }
          return item
        })
      }
    }
    case 'DELETE_USER': {
      return { users: [...state.users].filter(({ id }) => id !== user.id) }
    }
    case 'SET_USERS': {
      return { users }
    }
    default: {
      return state
    }
  }
}
