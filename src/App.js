import React from 'react';
import './App.css';
import Home from './Home/Home.js';
import { Switch, Route } from 'react-router-dom';
import MenuBar from './Home/Menu';
import Resume from './Resume/Resume';
import Blog from './Blog/Blog_HOC';
import MovieReview from './Home/Movie/MovieReview';
import BucketList from './Home/BucketList/BucketList';
import GasTracker from './Tools/GasTracker/GasTracker';
import Admin from './Home/Admin/Admin';
import Ac from './AC-App/AcApp';


function App() {
  return (
    <div className="App">
      <MenuBar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/resume' component={Resume} />
        <Route exact path='/blog/' component={Blog} />
        <Route exact path='/blog/:blogId' component={Blog} />
        <Route exact path='/movies' component={MovieReview}/>
        <Route exact path='/bucketlist' component={BucketList} />
        <Route exact path='/gas_tracker' component={GasTracker} />
        <Route exact path='/____admin' component={Admin} />
        <Route exact path='/ac-app' component={Ac} />
      </Switch>
    </div>
  );
}

export default App;
