import React, { Component } from 'react';
import axios from 'axios';

class Skills extends Component {

  state = {
    test: null,
    test2: undefined
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'https://6f4jesporh.execute-api.us-west-2.amazonaws.com/api/skills'
    })
    .then(data => {
      this.setState({skills: data.data.skills})
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return(
      <div className='portfolio' style={{width: '50%', paddingLeft: '30px'}}>
        <h3>Skills:</h3>
        {
          this.state.skills !== undefined ?
          this.state.skills.map(skillGroup => 
            <ul style={{float: "left"}} key={skillGroup[0].ID}>
            {skillGroup.map(skill =>
              <li key={skill.ID}>{skill.Name}: {skill.Years} (years)</li>
            )}
            </ul>
          ) :
          <p>Loading...</p>
        }
      </div>
    )
  }
}

export default Skills;