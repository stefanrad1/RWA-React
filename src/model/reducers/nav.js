export default (state = {isActive: false}, {type}) => {
  switch (type) {
    case 'TOGGLE': {
      return {isActive: !state.isActive}
    }
    default: {
      return state
    }
  }
}
