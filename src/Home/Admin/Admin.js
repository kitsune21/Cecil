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

  componentDidMount() {
    this.pullWorkData();
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

  handleSkillsSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: 'http://localhost:3001/api/skills/add',
      data: {
        Name: event.target.elements.skillsName.value,
        Years: event.target.elements.skillsYears.value,
        Active: event.target.elements.skillsActive.value,
      }
    })
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleGamesSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: 'http://localhost:3001/api/games/add',
      data: {
        Href: event.target.elements.gameHref.value,
        Title: event.target.elements.gameTitle.value,
        Description: event.target.elements.gameDescription.value,
        Released: event.target.elements.gameReleased.value
      }
    })
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  pullWorkData = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:3001/api/work'
    })
    .then(data => {
      this.setState({work: data.data.work})
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleWorkSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: 'http://localhost:3001/api/work/add',
      data: {
        Company: event.target.elements.workCompany.value,
        Href: event.target.elements.workHref.value,
        Location: event.target.elements.workLocation.value,
        Title: event.target.elements.workTitle.value,
        Description: event.target.elements.workDescription.value,
        Start_Date: event.target.elements.workStart.value,
        End_Date: event.target.elements.workEnd.value,
        Previous_Job: event.target.elements.workPrevious.selectedOptions[0].id === 0 ? null : event.target.elements.workPrevious.selectedOptions[0].id
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
            <form onSubmit={this.handleGamesSubmit}>
              <label>Href: <input id='gameHref' type='text'/></label>
              <label>Title: <input id='gameTitle' type='text'/></label>
              <label>Description: <input id='gameDescription' type='text'/></label>
              <label>Released: <input id='gameReleased' type='date' /></label>
              <button type='submit'>Submit</button>
            </form>
          </div>
          <h3>Work</h3>
          <div>
            <form onSubmit={this.handleWorkSubmit}>
              <label>Company: <input id='workCompany' type='text'/></label>
              <label>Href: <input id='workHref' type='text'/></label>
              <label>Location: <input id='workLocation' type='text'/></label>
              <label>Start Date: <input id='workStart' type='date'/></label>
              <label>End Date: <input id='workEnd' type='date'/></label>
              <label>Title: <input id='workTitle' type='text'/></label>
              <label>Description: <input id='workDescription' type='text'/></label>
              <label>Previous Job: 
                <select id='workPrevious'>
                  <option id='0'></option>
                {
                  this.state.work ? 
                  this.state.work.map(item =>
                    <option key={item.ID} id={item.ID}>{item.Company}</option>  
                  ) : null
                }
                </select></label>
              <button type='submit'>Submit</button>
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
            <form onSubmit={this.handleSkillsSubmit}>
              <label>Name: <input id='skillsName' type='text'/></label>
              <label>Years: <input id='skillsYears' type='text'/></label>
              <label>Active: <input id='skillsActive' type='checkbox'/></label>
              <button type="submit">Submit</button>
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