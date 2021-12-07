import React from 'react';
import { getter } from '../API/api'
import ItemsCarousel from 'react-items-carousel';

function Games({returnFormattedDate}) {

  const [ myGames, setMyGames ] = React.useState()
  const [ activeItemIndex, setActiveItemIndex ] = React.useState(0)

  React.useEffect(() => {
    getter(setMyGames, "/api/games")
  }, [])

  return(
    <div className='portfolio' style={{width: '50%', paddingLeft: '30px'}}>
      <h3>Games:</h3>
      {
        myGames ? 
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
          myGames.map( entry =>
            <div key={entry.ID} style={{ height: 200, width: '100%', background: '#EEE', padding: '5px', listStyle: 'none'}}>
              <p><a href={entry.Href} rel='noopener noreferrer' target='_blank'>{entry.Title}</a></p>
              <p>{entry.Description}</p>
              <p><b>Released: {returnFormattedDate(entry.Released)}</b></p>
            </div> )
        }
        </ItemsCarousel>
        : <p>Loading...</p>
      }
    </div>
  )
}

export default Games;