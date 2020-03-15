import React, { Component } from 'react';
import axios from 'axios';

class Education extends Component {
  
  state = {education: null}

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'http://localhost:3001/api/education'
    })
    .then(data => {
      this.setState({education: data.data.data})
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return(
      <div className='portfolio' style={{width: '50%', paddingLeft: '30px'}}>
          <h3>Education:</h3>
          {
            this.state.education !== null ?
            this.state.education.map( entry =>
              <ul key={entry.ID}>
                <li><a href={entry.Href} rel='noopener noreferrer' target='_blank'>{entry.Institution}</a></li>
                <li>{entry.Start_Date === null ? null : this.props.returnFormattedDate(entry.Start_Date) + '-'}{this.props.returnFormattedDate(entry.End_Date)}</li>
                <li>{entry.Recieved}</li>
              </ul>
            )
            :
            <p>Loading...</p>
          }
        </div>
    )
  }
}

export default Education;