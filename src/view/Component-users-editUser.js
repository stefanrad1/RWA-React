import React, {PureComponent} from 'react'
import {createStore} from 'redux'
import {
  Delete,
  Modal,
  ModalCard,
  ModalCardHeader,
  ModalCardBody,
  ModalCardFooter,
  ModalCardTitle,
  ModalBackground,
  Content,
  Columns,
  Column,
  Title,
  Button,
  Field,
  Icon,
  Label,
  Control,
  Input,
  Help
} from 'bloomer'
import {Link} from 'react-router-dom'
import {getTable, update} from '../model/db'
import {COMPONENT_DIDNT_MOUNT_ERROR_MSG, DB_ERROR_MSG} from '../model/constants'
import {getUser} from '../model/helpers'
import err from '../model/actions/conn'
import { editName, editEMail, mountUser } from '../model/actions/user'
import errReducer from '../model/reducers/conn'
import UserReducer from '../model/reducers/user'

export default class EditUser extends PureComponent {
  constructor (props) {
    super(props)

    this.store = createStore(UserReducer, props.match.params)
    this.state = this.store.getState()

    this.err = createStore(errReducer, {
      errorMessage: COMPONENT_DIDNT_MOUNT_ERROR_MSG
    })

    this.handleNameChange = e => this._handleNameChange(e)
    this.handleEMailChange = e => this._handleEMailChange(e)
    this.handleSubmit = e => this._handleSubmit(e)
    this.handleEnter = e => this._handleEnter(e)
  }
  componentWillMount () {
    this.store.subscribe(() => this.setState(this.store.getState()))
    this.err.subscribe(() => this.setState(this.err.getState()))
  }
  async componentDidMount () {
    try {
      const {data: users} = await getTable()
      const user = getUser(users, this.state.id)

      this.store.dispatch(mountUser(user))
    } catch (e) {
      this.err.dispatch(err(true, DB_ERROR_MSG))
    }
    window.addEventListener('online', this.componentDidMount.bind(this))
    window.addEventListener('offline', this.componentDidMount.bind(this))
  }
  _handleEnter (e) {
    if (e.keyCode === 13) {
      e.preventDefault()
    }
  }
  _handleNameChange ({
    target: {
      value: name
    }
  }) {
    this.store.dispatch(editName(name))
  }
  _handleEMailChange ({
    target: {
      value: email
    }
  }) {
    this.store.dispatch(editEMail(email))
  }
  async _handleSubmit (e) {
    e.preventDefault()

    const {nameValidated, emailValidated, name, email, id} = this.state

    try {
      const {status} = await update(name, email, id)

      if (nameValidated && emailValidated && status === 200) {
        window.location.hash = ''
      }
    } catch (catchErr) {
      this.err.dispatch(err(true, DB_ERROR_MSG))
    }
  }
  render () {
    const {defaultName, defaultEmail, nameValidated, emailValidated} = this.state
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
              onClick={this.handleSubmit}>Try again...</Link>
          </ModalCardFooter>
        </ModalCard>
      </Modal>
    )
    : (
      <form onSubmit={this.handleSubmit}>
        <Content className='content-white'>
          <Columns>
            <Column>
              <Title>Edit User</Title>
            </Column>
            <Column isSize={1} isOffset={8}>
              <Button type='submit' isSize='medium'>Save</Button>
            </Column>
          </Columns>
          <Content>
            <Columns>
              <Column>
                <Field>
                  <Label>Name</Label>
                  <Control hasIcons>
                    <Input
                      isColor={nameValidated
                      ? 'success'
                      : 'danger'}
                      placeholder='Name'
                      key={defaultName}
                      defaultValue={defaultName}
                      onChange={this.handleNameChange}
                      onKeyPress={this.handleEnter}
                      required />
                    <Icon isSize='small' isAlign='left'>
                      <span className='fa fa-user' aria-hidden='true' />
                    </Icon>
                    <Icon isSize='small' isAlign='right'>
                      <span
                        className={`fa fa-${nameValidated
                        ? 'check'
                        : 'close'}`}
                        aria-hidden='true' />
                    </Icon>
                  </Control>
                  <Help
                    isColor={nameValidated
                    ? 'success'
                    : 'danger'}>{`This name is is ${nameValidated
                      ? ''
                      : 'in'}valid`}</Help>
                </Field>
              </Column>
              <Column>
                <Field>
                  <Label>E-Mail</Label>
                  <Control hasIcons>
                    <Input
                      isColor={emailValidated
                      ? 'success'
                      : 'danger'}
                      placeholder='E-Mail'
                      key={defaultEmail}
                      defaultValue={defaultEmail}
                      onChange={this.handleEMailChange}
                      onKeyPress={this.handleEnter}
                      required />
                    <Icon isSize='small' isAlign='left'>
                      <span className='fa fa-send' aria-hidden='true' />
                    </Icon>
                    <Icon isSize='small' isAlign='right'>
                      <span
                        className={`fa fa-${emailValidated
                        ? 'check'
                        : 'close'}`}
                        aria-hidden='true' />
                    </Icon>
                  </Control>
                  <Help
                    isColor={emailValidated
                    ? 'success'
                    : 'danger'}>{`This e-mail is ${emailValidated
                      ? ''
                      : 'in'}valid`}</Help>
                </Field>
              </Column>
            </Columns>
          </Content>
        </Content>
      </form>
    )
  }
}
