import React from 'react';
import './App.css';
import Homepage from '../components/pages/homepage/homepage.component';
import { Route, Switch } from 'react-router-dom'


const HatsPage = () => (
  <div>
      <h1>Hats</h1>
  </div>
);


const JacketsPage = () => (
  <div>
      {console.log('Jackets')}
      <h1>Jackets</h1>
  </div>
);


function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/jackets' component={JacketsPage} />
        <Route exact path='/hats' component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App;
