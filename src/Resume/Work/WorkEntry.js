import React, { Component } from 'react';

class WorkEntry extends Component {

  renderOthers = (others) => { 
    return(
      others.map(entry =>
        <WorkEntry key={entry.id} entry={entry}/>  
      )
    )
  }

  render() {
    const { entry } = this.props;
    if(entry) {
      return(
        <ul key={entry.id} style={{ height: 200, width: '100%', background: '#EEE', padding: '5px', listStyle: 'none'}}>
          <li><a href={entry.href} rel='noopener noreferrer' target='_blank'>{entry.company}</a> ({entry.location}) - {entry.start} - {entry.end}</li>
          <li>{entry.title}</li>
          <li>{entry.description}</li>
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