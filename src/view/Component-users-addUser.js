import React, {PureComponent} from 'react'
import {
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
import { createStore } from 'redux'
import {create} from '../model/db'
import UserReducer from '../model/reducers/user'
import { editName, editEMail } from '../model/actions/user'

export default class AddUser extends PureComponent {
  constructor (props) {
    super(props)

    this.store = createStore(UserReducer)
    this.state = this.store.getState()
    this.store.subscribe(() => this.setState(this.store.getState()))

    this.handleNameChange = e => this._handleNameChange(e)
    this.handleEMailChange = e => this._handleEMailChange(e)
    this.handleSubmit = e => this._handleSubmit(e)
    this.handleEnter = e => this._handleEnter(e)
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

    const {nameValidated, emailValidated, name, email} = this.state

    const {status} = await create(name, email)

    if (nameValidated && emailValidated && status === 201) {
      window.location.hash = ''
    }
  }
  render () {
    const {defaultName, defaultEMail, nameValidated, emailValidated} = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <Content className='content-white'>
          <Columns>
            <Column>
              <Title>Add User</Title>
            </Column>
            <Column isSize={1} isOffset={8}>
              <Button type='submit' isSize='medium'>Add</Button>
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
                      key={defaultEMail}
                      defaultValue={defaultEMail}
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
