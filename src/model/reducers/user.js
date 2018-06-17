import { validateEMail, validateName } from '../helpers'

export default (state = {}, {type, name, email, params, user}) => {
  switch (type) {
    case 'PARAMS': {
      return {
        ...state,
        ...params,
        name: '',
        email: '',
        nameValidated: false,
        emailValidated: false,
        defaultName: '',
        defaultEmail: ''
      }
    }
    case 'EDIT': {
      return {
        ...state,
        name,
        email,
        nameValidated: validateName(name),
        emailValidated: validateEMail(email)
      }
    }
    case 'EDIT_INIT': {
      return {
        ...state,
        name,
        email,
        nameValidated: validateName(name),
        emailValidated: validateEMail(email),
        defaultName: name,
        defaultEmail: email
      }
    }
    case 'EDIT_NAME': {
      return {
        ...state,
        name,
        nameValidated: validateName(name)
      }
    }
    case 'EDIT_EMAIL': {
      return {
        ...state,
        email,
        emailValidated: validateEMail(email)
      }
    }
    case 'MOUNT_USER': {
      return {
        ...state,
        ...user,
        nameValidated: validateName(user.name),
        emailValidated: validateEMail(user.email),
        defaultName: user.name,
        defaultEmail: user.email
      }
    }
    default: {
      return {
        ...state,
        name: '',
        email: '',
        nameValidated: false,
        emailValidated: false,
        defaultName: '',
        defaultEmail: ''
      }
    }
  }
}
