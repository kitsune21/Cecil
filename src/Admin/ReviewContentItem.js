import React, { Component } from 'react';
import axios from 'axios';

class ReviewContentItem extends Component {

  state = {
    editContent: false,
    editContentID: 0,
  }

  componentDidMount() {
    axios({
      method: "GET",
      url: `https://6f4jesporh.execute-api.us-west-2.amazonaws.com/api/content/${this.props.reviewID}`
    })
    .then(data => {
      if(data.data.content.length > 0){
        this.setState({reviewContent: data.data.content})
      }
    })
  }

  addMovieContent = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: 'https://6f4jesporh.execute-api.us-west-2.amazonaws.com/api/content/add/',
      data: {
        Review_ID: this.props.reviewID,
        Spoiler: e.target.elements.contentSpoiler.checked,
        Text: e.target.elements.contentText.value,
      }
    })
    .then(
      console.log('added content')
    );
  }

  updateMovieContent = (e) => {
    e.preventDefault();
    axios({
      method: 'PUT',
      url: `https://6f4jesporh.execute-api.us-west-2.amazonaws.com/api/content/update/${this.props.reviewID}`,
      data: {
        Spoiler: e.target.elements.contentSpoiler.checked,
        Text: e.target.elements.contentText.value,
      }
    })
    .then(data => {
      console.log('updated content')
    })
    .catch(err => {
      console.log(err)
    })
  }

  buttonEditToggle = (e) => {
    this.setState({editContent: !this.state.editContent, editContentID: e.target.id})
  }

  buttonCancelToggle = () => {
    this.setState({editContentID: 0, editContent: false})
  }
  
  render() {
    return(
      parseInt(this.props.reviewID) === parseInt(this.props.activeReviewID) ?
      <ul>
        {
          this.state.reviewContent ? 
          this.state.reviewContent.map(content =>
            this.state.editContent && parseInt(this.state.editContentID) === parseInt(content.ID)?
              <form key={content.ID} onSubmit={this.updateMovieContent}>
                <textarea id='contentText' defaultValue={content.Text}/>
                <label>Spoiler? <input type='checkbox' id='contentSpoiler' defaultChecked={content.Spoiler}/></label>
                <button type='submit'>Submit</button>
                <button onClick={this.buttonCancelToggle}>Cancel</button>
              </form> 
            : <li key={content.ID}>{content.Text}{content.Spoiler ? '  (Spoiler)' : null} <button id={content.ID} onClick={this.buttonEditToggle}>Edit</button></li> 
          ) :
          null
        }
        <li>Add:</li>
        <form onSubmit={this.addMovieContent}>
          <textarea id='contentText'/>
          <label>Spoiler? <input type='checkbox' id='contentSpoiler' defaultChecked={false}/></label>
          <button type='submit'>Submit</button>
        </form>
      </ul> : null
    )
  }
}

export default ReviewContentItem;