import React from 'react';
import './App.css';
import Home from './Home/Home.js';
import { Switch, Route } from 'react-router-dom';
import MenuBar from './Home/Menu';
import Resume from './Resume/Resume';
import Blog from './Blog/Blog_HOC';


function App() {
  return (
    <div className="App">
      <MenuBar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/resume' component={Resume} />
        <Route exact path='/blog/' component={Blog} />
        <Route exact path='/blog/:blogId' component={Blog} />
      </Switch>
    </div>
  );
}

export default App;
