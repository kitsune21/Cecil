import React from 'react';
import { getter } from '../API/api'
import ItemsCarousel from 'react-items-carousel';

function Games({returnFormattedDate}) {

  const [ myGames, setMyGames ] = React.useState()
  const [ activeItemIndex, setActiveItemIndex ] = React.useState()

  React.useEffect(() => {
    getter(setMyGames, "/api/games")
  }, [])

  function onChange(value) {
    setActiveItemIndex(value)
  }

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
          requestToChangeActive={onChange}
          leftChevron={<button>{'<'}</button>} 
          rightChevron={<button>{'>'}</button>}
          outsideChevron
          chevronWidth={20}
        >
        {
          myGames.map( entry =>
            <ul key={entry.ID} style={{ height: 200, width: '100%', background: '#EEE', padding: '5px', listStyle: 'none'}}>
              <li><a href={entry.Href} rel='noopener noreferrer' target='_blank'>{entry.Title}</a></li>
              <li>{entry.Description}</li>
              <li><b>Released: {returnFormattedDate(entry.Released)}</b></li>
            </ul> )
        }
        </ItemsCarousel>
        : <p>Loading...</p>
      }
    </div>
  )
}

export default Games;