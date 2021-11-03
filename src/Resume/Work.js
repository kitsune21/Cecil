import React from 'react';
import WorkEntry from './Work/WorkEntry';
import ItemsCarousel from 'react-items-carousel';
import axios from 'axios';

function Work() {

  const [ work, setWork ] = React.useState()
  const [activeItemIndex, setActiveItemIndex] = React.useState(0)

  React.useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://6f4jesporh.execute-api.us-west-2.amazonaws.com/api/work'
    })
    .then(data => {
      setWork(data.data.work)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  function onChange(value) {setActiveItemIndex(value)}

  return(
    work ? 
    <div className='work' style={{width: '50%', paddingLeft: '30px'}}>
        <h3>Work:</h3>
        <ItemsCarousel
          infiniteLoop
          gutter={5}
          numberOfCards={2}
          activeItemIndex={activeItemIndex}
          requestToChangeActive={onChange}
          leftChevron={<button>{'<'}</button>} 
          rightChevron={<button>{'>'}</button>}
          outsideChevron
          chevronWidth={20}
        >
        {
          work.map( entry =>
            !entry.Job_ID ?
            <WorkEntry key={entry.ID} entry={entry} />  :
            null
          )
        }
        </ItemsCarousel>
      </div> : 
      <p>Loading...</p>
  )
}

export default Work;