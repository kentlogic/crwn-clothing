import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { auth, createUserProfile, addCollectionAndDocuments } from '../firebase/firebase.utils';
import { connect  } from 'react-redux';
import { setCurrentUser } from '../redux/user/user.actions';
import HomePage from '../pages/homepage/homepage.component';
import ShopPage from '../pages/shop/shop.component.jsx';
import Header from '../components/header/header.component.jsx';
import SignInAndSignUpPage from '../pages/signin-and-signup/signin-and-signup.component.jsx';
import { selectCurrentUser } from '../redux/user/user.selectors'
import { createStructuredSelector } from 'reselect'
import CheckOutPage from '../pages/checkout/checkout.component';
import { selectCollectionsPreview } from'../redux/shop/shop.selectors'
class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, collectionsArray } = this.props

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
      //only pass the title and items, remove the ID and routename  
      const filteredCollections = collectionsArray.map(({ title, items }) =>
        ({title, items}))
      addCollectionAndDocuments('collections', filteredCollections)
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
        <Route exact path='/checkout' component={CheckOutPage} />
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact 
          path='/signin' render={() => this.props.currentUser ?
          <Redirect to='/' /> : <SignInAndSignUpPage/>} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsPreview
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

//null because we dont need to pass any state
export default connect(mapStateToProps, mapDispatchToProps)(App);
