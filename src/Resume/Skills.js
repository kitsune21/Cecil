import React from 'react';
import { getSkills } from '../API/api'

function Skills() {

  const [ skills, setSkills ] = React.useState()

  React.useEffect(() => {
    getSkills(setSkills)
  }, [])

  return(
    <div className='portfolio' style={{width: '50%', paddingLeft: '30px'}}>
      <h3>Skills:</h3>
      {
        skills?.map(skillGroup => 
          <ul style={{float: "left"}} key={skillGroup[0].ID}>
          {skillGroup.map(skill =>
            <li key={skill.ID}>{skill.Name}: {skill.Years} (years)</li>
          )}
          </ul>
        )
      }
    </div>
  )
}

export default Skills;