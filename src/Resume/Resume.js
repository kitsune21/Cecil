import React, {Component} from 'react';
import About from './About';
import Education from './Education';
import Work from './Work';
import Websites from './Websites';
// import Awards from './Awards';
import Games from './Games';

class Resume extends Component {

  render() {
    return(
      <div>
        <About />
        <Websites />
        <Games />
        <Work />
        <Education />
        {/* <Awards /> */}
      </div>
    )
  }
}

export default Resume;