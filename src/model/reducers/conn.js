export default (state, {type, msg = true}) => {
  switch (type) {
    case 'SHOW_ERROR': {
      return {error: true, errorMessage: msg}
    }
    default: {
      return {error: false, errorMessage: false}
    }
  }
}
