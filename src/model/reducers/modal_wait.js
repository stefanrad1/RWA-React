export default (state, {type}) => {
  switch (type) {
    case 'CONTINUE': {
      return {wait: false}
    }
    default: {
      return {wait: true}
    }
  }
}
