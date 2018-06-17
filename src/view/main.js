import React, {Component} from 'react'
import {Container} from 'bloomer'
import {Route, Switch} from 'react-router-dom'
import NavBar from './nav'
import Footer from './footer'

import ListUsers from './Component-users-List'
import AddUser from './Component-users-addUser'
import EditUser from './Component-users-editUser'

export default class App extends Component {
  render () {
    return <Container className='container-fullwidth'><NavBar />
      <Switch>
        <Route exact path='/' component={ListUsers} />
        <Route exact path='/remove/:id' component={ListUsers} />
        <Route exact path='/add' component={AddUser} />
        <Route exact path='/edit/:id' component={EditUser} />
      </Switch>
      <Footer /></Container>
  }
}
