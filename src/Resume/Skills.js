import React from 'react';
import axios from 'axios';

function Skills() {

  const [ skills, setSkills ] = React.useState()

  React.useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://6f4jesporh.execute-api.us-west-2.amazonaws.com/api/skills'
    })
    .then(data => {
      setSkills(data.data.skills)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return(
    <div className='portfolio' style={{width: '50%', paddingLeft: '30px'}}>
      <h3>Skills:</h3>
      {
        skills !== undefined ?
        skills.map(skillGroup => 
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

export default Skills;