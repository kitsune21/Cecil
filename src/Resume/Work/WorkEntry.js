import React, { Component } from 'react';

class WorkEntry extends Component {

  render() {
    const { entry } = this.props;
    if(entry) {
      return(
        <ul key={entry.id}>
          <li><a href={entry.href} rel='noopener noreferrer' target='_blank'>{entry.company}</a> ({entry.location}) - {entry.start} - {entry.end}</li>
          <li>{entry.title}</li>
          <li>{entry.description}</li>
        </ul>
      )
    } else {
      return null;
    }
  }
}

export default WorkEntry;