import React, {Component} from 'react';
// import About from './About';
import Education from './Education';
import Work from './Work';
import Websites from './Websites';
// import Awards from './Awards';
import Games from './Games';
import Skills from './Skills';

class Resume extends Component {

  returnFormattedDate = myDate => {
    let newDate = new Date(myDate);
    return `${newDate.getMonth() + 1}/${newDate.getFullYear()}`
  }

  render() {
    return(
      <div>
        <a href='http://localhost:3001/ResumeFile/Resume.pdf' target='__blank' download>Download PDF</a>
        {/* <About /> */}
        <Websites />
        <Games returnFormattedDate={this.returnFormattedDate}/>
        <Work returnFormattedDate={this.returnFormattedDate}/>
        <Education returnFormattedDate={this.returnFormattedDate}/>
        <Skills />
        {/* <Awards /> */}
      </div>
    )
  }
}

export default Resume;