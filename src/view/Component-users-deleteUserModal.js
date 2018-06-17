import React, {PureComponent} from 'react'
import {
  Delete,
  Modal,
  ModalCard,
  ModalCardHeader,
  ModalCardBody,
  ModalCardFooter,
  ModalCardTitle,
  ModalBackground
} from 'bloomer'
import {Link} from 'react-router-dom'
import {remove} from '../model/db'
import {getUser} from '../model/helpers'

// This component is so simple, i'm think there no need Redux container
export default class DeleteModal extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {...props}

    this.onDelete = async () => {
      const {status} = await remove(props.userId)
      if (status === 200) {
        this
          .props
          .onOK()
      }
    }
  }
  componentDidMount () {
    const userName = getUser(this.state.users, this.state.userId).name
    this.setState({ userName })
  }
  componentWillReceiveProps (nextProps) {
    const userName = getUser(this.props.users, nextProps.userId).name
    this.setState({
      ...nextProps,
      userName
    })
  }
  render () {
    return (
      <Modal isActive>
        <ModalBackground />
        <ModalCard>
          <ModalCardHeader>
            <ModalCardTitle>{`Delete user ${this.state.userName}?`}</ModalCardTitle>
            <Link to='/'><Delete /></Link>
          </ModalCardHeader>
          <ModalCardBody>
            {`Are you sure, do you want remove this user ${this.state.userName}?`}
          </ModalCardBody>
          <ModalCardFooter>
            <Link to='/' className='button is-danger' onClick={this.onDelete}>Yes</Link>
            <Link to='/' className='button is-warning'>No</Link>
          </ModalCardFooter>
        </ModalCard>
      </Modal>
    )
  }
}
