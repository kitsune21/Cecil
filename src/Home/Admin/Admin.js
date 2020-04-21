import React, { Component } from 'react';
import axios from 'axios';

class Admin extends Component {

  state = {
    rankingCategory: [
      {ID: 1, Name: "Cinematography"},
      {ID: 2, Name: "Pacing"},
      {ID: 3, Name: "Music/Sound"},
      {ID: 4, Name: "Re-Watchability"},
      {ID: 5, Name: "Recommendation"}
    ],
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: 'http://localhost:3001/api/websites/add',
      data: {
        Href: event.target.elements.websiteHref.value,
        Title: event.target.elements.websiteTitle.value,
        Description: event.target.elements.websiteDescription.value,
        Tech: event.target.elements.websiteTech.value
      }
    })
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return(
      <>
        <div>
          <h2>Resume</h2>
          <h3>Websites</h3>
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>Href: <input id='websiteHref' type='text' /></label>
              <label>Title: <input id='websiteTitle' type='text' /></label>
              <label>Description: <input id='websiteDescription' type='text' /></label>
              <label>Tech: <input id='websiteTech' type='text' /></label>
              <button type='submit'>Submit</button>
            </form>
          </div>
          <h3>Game</h3>
          <div>
            <form>
              <label>Href: <input></input></label>
              <label>Title: <input></input></label>
              <label>Description: <input></input></label>
              <label>Released: <input></input></label>
            </form>
          </div>
          <h3>Work</h3>
          <div>
            <form>
              <label>Company: <input></input></label>
              <label>Href: <input></input></label>
              <label>Location: <input></input></label>
              <label>Start Date: <input></input></label>
              <label>End Date: <input></input></label>
              <label>Title: <input></input></label>
              <label>Description: <input></input></label>
              <label>Previous Job: <select></select></label>
            </form>
          </div>
          <h3>Education</h3>
          <div>
            <form>
              <label>Institution: <input></input></label>
              <label>Href: <input></input></label>
              <label>Start Date: <input></input></label>
              <label>End Date: <input></input></label>
              <label>Recieved: <input></input></label>
            </form>
          </div>
          <h3>Skills</h3>
          <div>
            <form>
              <label>Name: <input></input></label>
              <label>Years: <input></input></label>
            </form>
          </div>
          <h2>Movie Reviews</h2>
          <div>
            <form>
              <label>Title: <input></input></label>
              <label>Imdb ID: <input></input></label>
              <label>Cecil Rank: <input></input></label>
              {
                this.state.rankingCategory.map(category => 
                  <label key={category.ID}>{category.Name} <input></input></label>
                )
              }
              <label>Review: <input></input></label>
            </form>
          </div>
          <h2>Bucket List</h2>
        </div>
      </>
    )
  }
}

export default Admin;