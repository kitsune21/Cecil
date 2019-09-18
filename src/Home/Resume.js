import React, {Component} from 'react';

class Resume extends Component {

  render() {
    return(
      <div>
        <div className='intro'>
          <ul>
            <li>Cecil Thomas</li>
            <li>3774 W 7910 S West Jordan, UT 84088</li>
            <li>435-668-2486</li>
          </ul>
        </div>
        <div className='education'>
          <p>Devpoint Labs - 2019</p>
          <p>Desert Hills High School - 2011</p>
        </div>
        <div className='work'>
          <ul>
            <li>Digicert, Inc (Lehi) - 02/2018 - 08/2019</li>
            <li>Validation Specialist</li>
            <li>Description</li>
          </ul>
          <ul>
            <li>Entrata (Lehi) - 07/2018 - Current</li>
            <li>Client Resolution Specialist</li>
            <li>Description</li>
          </ul>
        </div>
        <div className='portfolio'>
          <p>Hi</p>
        </div>
        <div className='awards'>
          <ul>
            <li>Eagle Scout Award</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Resume;