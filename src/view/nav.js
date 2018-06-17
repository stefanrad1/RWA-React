import React, {PureComponent} from 'react'
import {
  Field,
  Control,
  NavbarBrand,
  Icon,
  Button,
  NavbarBurger,
  NavbarItem,
  NavbarMenu,
  Navbar,
  NavbarStart,
  NavbarEnd
} from 'bloomer'
import {createStore} from 'redux'

import navReducer from '../model/reducers/nav'
import navAction from '../model/actions/nav'

export default class NavBar extends PureComponent {
  constructor (props) {
    super(props)
    this.store = createStore(navReducer)
    this.state = this
      .store
      .getState()
  }
  componentWillMount () {
    this
      .store
      .subscribe(() => this.setState(this.store.getState()))
    this._onToggleMenuOnMobile = () => this
      .store
      .dispatch(navAction())
  }
  render () {
    return (
      <Navbar className='my-nav'>
        <NavbarBrand>
          <NavbarItem>
            JSON Editor
          </NavbarItem>
          <NavbarBurger
            isActive={this.state.isActive}
            onClick={this._onToggleMenuOnMobile} />
        </NavbarBrand>
        <NavbarMenu isActive={this.state.isActive} onClick={this._onToggleMenuOnMobile}>
          <NavbarStart>
            <NavbarItem href='#/'>Dashboard</NavbarItem>
          </NavbarStart>
          <NavbarEnd>
            <NavbarItem>
              <Field isGrouped>
                <Control>
                  <Icon
                    className='button fa fa-github'
                    isSize='medium'
                    style={{
                      marginRight: '1em'
                    }} />
                  <Icon
                    className='button fa fa-twitter'
                    isSize='medium'
                    style={{
                      marginRight: '1em',
                      color: '#55acee'
                    }} />
                  <Button id='twitter'>
                    <Icon className='fa fa-twitter' />
                    <span>Tweet</span>
                  </Button>
                </Control>
              </Field>
            </NavbarItem>
          </NavbarEnd>
        </NavbarMenu>
      </Navbar>
    )
  }
}
