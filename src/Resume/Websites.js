import React, { useState, useEffect } from 'react';
import ItemsCarousel from 'react-items-carousel';
import axios from 'axios';

const Websites = () => {

  var [myWebsites, setMyWebsites] = useState();
  const [activeItemIndex, setActiveItemIndex,] = useState(0);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://ec2-52-53-158-205.us-west-1.compute.amazonaws.com:3001/api/websites'
    })
    .then(data => {
      setMyWebsites(data.data.websites);
    })
    .catch(err => {
      console.log(err)
    })
  }, []);

    return(
      myWebsites ? 
      <div className='portfolio' style={{width: '50%', paddingLeft: '30px'}}>
        <h3>Websites:</h3>
        <ItemsCarousel
          infiniteLoop
          gutter={5}
          numberOfCards={2}
          activeItemIndex={activeItemIndex}
          requestToChangeActive={setActiveItemIndex}
          leftChevron={<button>{'<'}</button>} 
          rightChevron={<button>{'>'}</button>}
          outsideChevron
          chevronWidth={20}
        >
        {
          myWebsites.map( entry => 
            <div key={entry.ID} style={{ height: 200, width: '100%', background: '#EEE', padding: '5px' }}>
              <p><a href={entry.Href} target='_blank' rel='noopener noreferrer'>{entry.Title}</a></p>
              <p>{entry.Description}</p>
              <p><b>Tech: {entry.Tech}</b></p>
            </div>
          )
        }
        </ItemsCarousel>
      </div> :
      <p>Loading...</p>
    )
}

export default Websites;