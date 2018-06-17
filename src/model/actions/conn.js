export default (state, msg) => ({type: state ? 'SHOW_ERROR' : 'HIDE_ERROR', msg})
