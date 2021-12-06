import React from 'react';
import Home from './Home/Home.js';
import { Switch, Route } from 'react-router-dom';
import MenuBar from './Home/Menu';
import Resume from './Resume/Resume';
import MovieReview from './Home/Movie/MovieReview';
import Admin from './Admin/Admin';
import AdminMovieReview from './Admin/AdminMovieReview';
import Marathon from './Home/Marathon/Marathon'


function App() {
  return (
    <div className="App">
      <MenuBar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/resume' component={Resume} />
        <Route path='/movies' component={MovieReview}/>
        <Route path='/marathon' component={Marathon}/>
        <Route path='/____admin' component={Admin} />
        <Route path='/____admin/movie' component={AdminMovieReview} />
      </Switch>
    </div>
  );
}

export default App;
