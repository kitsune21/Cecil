import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';

//{id: , href:'', text:'', description:'', tech:'', },
const data = [
  {id: 1, href:'http://frozenspade.tv', text:'Frozenspade.tv', description:'A website for the Twitch streamer and Speedrunner Frozenspade.', tech:'React, 3rd Party APIs', },
  {id: 2, href:'http://assist.to', text:'Assist.TO', description:'A prototype build for an esports tournament management and analytical platform. (Server is currently turned off)', tech:'React, Node, Express, Postgres, AWS', },
  {id: 3, href:'https://digitalglovebox.herokuapp.com/', text:'Digital Glovebox', description:'Capstone project for DevPoint Labs, built in collaboration with 3 others.', tech:'Ruby-on-Rails, React, Postgres', },
];

const Websites = () => {

  const [activeItemIndex, setActiveItemIndex] = useState(0);
    return(
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
          data.map( entry => 
            <div key={entry.id} style={{ height: 200, width: '100%', background: '#EEE' }}>
              <p><a href={entry.href} target='_blank' rel='noopener noreferrer'>{entry.text}</a></p>
              <p>{entry.description}</p>
              <p>Tech: {entry.tech}</p>
            </div>
          )
        }
        </ItemsCarousel>
      </div>
    )
}

export default Websites;