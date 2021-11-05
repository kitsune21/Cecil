import React from 'react';
// import About from './About';
import Education from './Education';
import Work from './Work';
import Websites from './Websites';
// import Awards from './Awards';
import Games from './Games';
import Skills from './Skills';

function Resume() {

  function returnFormattedDate(myDate) {
    let newDate = new Date(myDate);
    return `${newDate.getMonth() + 1}/${newDate.getFullYear()}`
  }

  return(
    <div>
      <a href='https://s3-us-west-1.amazonaws.com/cecil-thomas.com/Assets/Resume.pdf' target='__blank' download>Download PDF</a>
      <Websites />
      <Games returnFormattedDate={returnFormattedDate}/>
      <Work returnFormattedDate={returnFormattedDate}/>
      <Education returnFormattedDate={returnFormattedDate}/>
      <Skills />
    </div>
  )
}

export default Resume;