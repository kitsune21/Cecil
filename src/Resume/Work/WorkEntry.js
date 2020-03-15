import React, { Component } from 'react';

class WorkEntry extends Component {

  renderOthers = (others) => { 
    return(
      others.map(entry =>
        <WorkEntry key={entry.ID} entry={entry}/>  
      )
    )
  }

  render() {
    const { entry } = this.props;
    if(entry) {
      return(
        <ul key={entry.ID} style={{ height: 200, width: '100%', background: '#EEE', padding: '5px', listStyle: 'none'}}>
          <li><a href={entry.Href} rel='noopener noreferrer' target='_blank'>{entry.Company}</a> ({entry.Location}) - {entry.start} - {entry.end}</li>
          <li>{entry.Title}</li>
          <li>{entry.Description}</li>
          {
            this.props.otherEntries ? this.renderOthers(this.props.otherEntries) : null
          }
        </ul>
      )
    } else {
      return null;
    }
  }
}

export default WorkEntry;