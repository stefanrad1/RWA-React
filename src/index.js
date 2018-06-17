import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'

import './style.scss'

import App from './view/main'

render(<HashRouter hashType='noslash'>
  <App />
</HashRouter>, document.getElementById('app'))
