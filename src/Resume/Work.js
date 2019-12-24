import React, { Component } from 'react';
import WorkEntry from './Work/WorkEntry';
import ItemsCarousel from 'react-items-carousel';

//{id: , job_id: null, company:'', href:'', location:'', start:'', end:'', title:'', description:'', },
const data = [
  {id: 1, job_id: null, company:'Entrata', href:'https://www.entrata.com/', location:'Lehi, UT', start:'05/2019', end:'Current', title:'Client Resolution Specialist', description:'Description', },
  {id: 2, job_id: 1, company:'Entrata', href:'https://www.entrata.com/', location:'Lehi, UT', start:'07/2018', end:'05/2019', title:'First Response Specialist', description:'Description', },
  {id: 3, job_id: null, company:'Digicert, Inc', href:'https://www.digicert.com/', location:'Lehi, UT', start:'02/2018', end:'08/2019', title:'Validation Specialist', description:'Description', },
  {id: 4, job_id: null, company:'SkyWest Inc', href:'https://www.skywest.com/', location:'St. George, UT', start:'07/2015', end:'11/2015', title:'Mobile Device Technician', description:'Setup Surface tablets for use as an electronic flight bag for pilots.', },
  {id: 5, job_id: null, company:'Zion Internation Programs', href:'https://zip-usa.com', location:'St. George, UT', start:'07/2014', end:'10/2017', title:'Tour Guide', description:'Assist with groups of high school/middle school Japanese students by coordinating transportation, and teaching English.', },
];

class Work extends Component {

  state = {
    activeItemIndex: 0,
  };

  renderOtherJobs = (myID) => {
    let newEntries = [];
    data.forEach( entry =>
      entry.job_id === myID ? newEntries.push(entry) : null
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
            data.map( entry =>
              !entry.job_id ?
              <WorkEntry key={entry.id} entry={entry} otherEntries={this.renderOtherJobs(entry.id)}/>  :
              null
            )
          }
          </ItemsCarousel>
        </div>
    )
  }
}

export default Work;