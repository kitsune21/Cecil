import React from 'react';
import Home from './Home/Home.js';
import { Switch, Route } from 'react-router-dom';
import MenuBar from './Home/Menu';
import Resume from './Resume/Resume';
import MovieReviewList from './Home/Movie/MovieReviewList';
import Admin from './Admin/Admin';
import AdminMovieReview from './Admin/AdminMovieReview';
import Marathon from './Home/Marathon/Marathon'
import GasTracker from './Tools/GasTracker/GasTracker.js';


function App() {
  return (
    <div className="App">
      <MenuBar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/resume' component={Resume} />
        <Route path='/movies' component={MovieReviewList}/>
        <Route path='/marathon' component={Marathon}/>
        <Route exact path='/____admin' component={Admin} />
        <Route exact path='/____admin/movie' component={AdminMovieReview} />
        <Route exact path='/____gas' component={GasTracker} />
      </Switch>
    </div>
  );
}

export default App;
