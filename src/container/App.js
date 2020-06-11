import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { auth } from '../firebase/firebase.utils'

import HomePage from '../pages/homepage/homepage.component';
import ShopPage from '../pages/shop/shop.component.jsx';
import SignInAndSignUp from '../pages/signin-and-signup/signin-and-signup.component.jsx';
import Header from '../components/header/header.component.jsx';

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user })
    })
  }
  
  //unsubscribe from firebase
  componentWillUnmount () {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser = {this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
