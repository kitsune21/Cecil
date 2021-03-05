import React, { Component } from 'react';
import WorkEntry from './Work/WorkEntry';
import ItemsCarousel from 'react-items-carousel';
import axios from 'axios';

class Work extends Component {

  state = {
    activeItemIndex: 0,
  };

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'https://6f4jesporh.execute-api.us-west-2.amazonaws.com/api/work'
    })
    .then(data => {
      this.setState({work: data.data.work})
    })
    .catch(err => {
      console.log(err)
    })
  }

  renderOtherJobs = (myID) => {
    let newEntries = [];
    this.state.work.forEach( entry =>
      entry.Job_ID === myID ? newEntries.push(entry) : null
    )
    if(newEntries){
      return newEntries
    } else {
      return null
    }
  }

  onChange = value => this.setState({ activeItemIndex: value });

  render() {
    return(
      this.state.work ? 
      <div className='work' style={{width: '50%', paddingLeft: '30px'}}>
          <h3>Work:</h3>
          <ItemsCarousel
            infiniteLoop
            gutter={5}
            numberOfCards={2}
            activeItemIndex={this.state.activeItemIndex}
            requestToChangeActive={this.onChange}
            leftChevron={<button>{'<'}</button>} 
            rightChevron={<button>{'>'}</button>}
            outsideChevron
            chevronWidth={20}
          >
          {
            this.state.work.map( entry =>
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
}

export default Work;