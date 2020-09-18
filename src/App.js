import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Browse from './components/Browse'
import TopStories from './components/TopStories'

import Notifications from 'react-notify-toast'

const App = () => {
  return (
    <BrowserRouter>
      <Notifications />
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/browse' component={Browse} />
        <Route path='/top-stories' component={TopStories} />

      </Switch>
    </BrowserRouter>
  )
}

export default App
