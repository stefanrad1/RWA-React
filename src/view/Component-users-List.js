import React, {PureComponent} from 'react'
import {
  Delete,
  Modal,
  ModalCard,
  ModalCardHeader,
  ModalCardBody,
  ModalCardFooter,
  ModalCardTitle,
  ModalBackground,
  Icon,
  Content,
  Title,
  DropdownItem,
  DropdownContent,
  Columns,
  Column
} from 'bloomer'
import {Link, Route} from 'react-router-dom'
import {createStore} from 'redux'
import {getTable} from '../model/db'
import {DB_ERROR_MSG, COMPONENT_DIDNT_MOUNT_ERROR_MSG} from '../model/constants'

import err from '../model/actions/conn'
import modalWait from '../model/actions/modal_wait'
import { deleteUser, setUsers } from '../model/actions/user_mng'

import errReducer from '../model/reducers/conn'
import modalWaitReducer from '../model/reducers/modal_wait'
import UsersReducer from '../model/reducers/users'

import DeleteModal from './Component-users-deleteUserModal'

export default class List extends PureComponent {
  constructor (props) {
    super(props)

    this.err = createStore(errReducer, {
      errorMessage: COMPONENT_DIDNT_MOUNT_ERROR_MSG
    })
    this.wait = createStore(modalWaitReducer)
    this.store = createStore(UsersReducer)

    this.state = this.store.getState()
  }
  componentWillMount () {
    this.store.subscribe(() => this.setState(this.store.getState()))
    this.wait.subscribe(() => this.setState(this.wait.getState()))
    this.err.subscribe(() => this.setState(this.err.getState()))
  }
  async componentDidMount () {
    try {
      const {data: users} = await getTable()
      this.store.dispatch(setUsers(users))
      this.err.dispatch(err(false))
      this.wait.dispatch(modalWait(false))
    } catch (e) {
      this.err.dispatch(err(true, DB_ERROR_MSG))
    }
    window.addEventListener('online', this.componentDidMount.bind(this))
    window.addEventListener('offline', this.componentDidMount.bind(this))
  }
  onRemoveItem (user) {
    this.store.dispatch(deleteUser(user))
  }
  render () {
    return this.state.error
      ? (
        <Modal isActive>
          <ModalBackground />
          <ModalCard>
            <ModalCardHeader>
              <ModalCardTitle>{`Error!`}</ModalCardTitle>
              <Link to='/'><Delete /></Link>
            </ModalCardHeader>
            <ModalCardBody>
              <p>Something goes wrong, please try again later...</p>
              <p>Here message of error:</p>
              <pre>{String(this.state.errorMessage)}</pre>
            </ModalCardBody>
            <ModalCardFooter>
              <Link
                to='/'
                className='button'
                onClick={this
                .componentDidMount
                .bind(this)}>Try again...</Link>
            </ModalCardFooter>
          </ModalCard>
        </Modal>
      )
      : (
        <Content className='content-white'>
          <Route
            path='/remove/:id'
            render={({match}) => this.state.wait
            ? <div />
            : (<DeleteModal
              users={this.state.users}
              userId={match.params.id}
              onOK={this.onRemoveItem.bind(this, match.params)} />)} />
          <Columns>
            <Column>
              <Title>Users List</Title>
            </Column>
            <Column isSize={1} isOffset={8}>
              <Link to='/add'><Icon className='fa fa-plus fa-2x' isSize='medium' /></Link>
            </Column>
          </Columns>
          <DropdownContent>{this.state.users.map(({
                id,
                name,
                email
              }, i) => (
                <DropdownItem key={`user-${i}`}>
                  <Columns className='column' isMultiline>
                    <Column>
                      <Title isSize='large'>{name}</Title>
                      <p>{email
                          ? `E-Mail: ${email}`
                          : ''}</p>
                    </Column>
                    <Column
                      isSize={1}
                      isOffset={9}
                      style={{
                        width: 'auto'
                      }}>
                      <Link to={`/edit/${id}`}><Icon className='fa fa-edit fa-2x' isSize='medium' /></Link>
                      <Link to={`/remove/${id}`}><Icon className='fa fa-remove fa-2x' isSize='medium' /></Link>
                    </Column>
                  </Columns>
                </DropdownItem >
              ))}</DropdownContent>
        </Content>
      )
  }
}
