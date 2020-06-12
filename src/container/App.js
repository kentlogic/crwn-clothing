import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { auth, createUserProfile } from '../firebase/firebase.utils';
import { connect  } from 'react-redux';
import { setCurrentUser } from '../redux/user/user.actions';
import HomePage from '../pages/homepage/homepage.component';
import ShopPage from '../pages/shop/shop.component.jsx';
import Header from '../components/header/header.component.jsx';
import SignInAndSignUpPage from '../pages/signin-and-signup/signin-and-signup.component.jsx';


class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfile(userAuth)

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth)
    });
  }
  
  //unsubscribe from firebase
  componentWillUnmount () {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' render={() => this.props.currentUser ?
          <Redirect to='/' /> : <SignInAndSignUpPage/>} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

//null because we dont need to pass any state
export default connect(mapStateToProps, mapDispatchToProps)(App);
