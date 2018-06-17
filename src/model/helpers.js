export let getUser = (state, userId) => [...state].filter(({ id }) => id === userId)[0]
export let validateEMail = email => email && (email.indexOf('.') !== -1 && email.indexOf('.') !== -1) && email.split('.')[1].length > 0
export let validateName = name => name && name.length > 3
