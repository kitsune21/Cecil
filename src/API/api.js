import axios from 'axios' 

const URL = "https://6f4jesporh.execute-api.us-west-2.amazonaws.com"
//const URL = "http://localhost:3001"

export function getter(setter, url, debug=false) {
  axios({
    method: 'GET',
    url: URL + url
  })
  .then(res => {
    setter([...res.data.data])
    if(debug){
      console.log(res)
    }
  })
  .catch(err => {
    console.log(err)
  })
}

export function getMovieReviews(setter) {
  axios({
    method: "GET",
    url: URL + "api/movie_reviews",
  })
  .then( res => setter(res.data.reviews))
  .catch( err => console.log(err))
}

export function getRankingCategories(setter) {
  axios({
    method: "GET",
    url: URL + "api/ranking_category"
  })
  .then( data => setter([...data.data.data]))
  .catch( err => console.log(err))
}

export function getCommonMarathonsWithCecilMarathon(setter) {
  axios({
    method: 'GET',
    url: URL + "marathon/common-marathons/length"
  })
  .then(res => {
    getCecilMarathon(res.data.data, setter)
  })
  .catch(err => {
    console.log(err)
  })
}

function getCecilMarathon(commonMarathons, setter) {
  axios({
    method: 'GET',
    url: URL + "marathon/cecil-rank-marathon"
  })
  .then(res => {
    setter([...commonMarathons, res.data.data])
  })
  .catch(err => {
    console.log(err)
  })
}

export function movieSearchOMDB(setter, movieTitle) {
  axios({
    method: "GET",
    url: URL + "marathon/search/" + movieTitle,
  })
  .then( data => setter([...data.data.data.Search]))
  .catch( err => { console.log(err)})
}

export function searchMovieByIDAndAddMinutes(movieID, movieLengthList, setMovieLengthList, marathonLength, setMarathonLength) {
  axios({
    method: "GET",
    url: URL + "marathon/search/runtime/" + movieID,
  })
  .then( data => {
    let movieEntry = {
      id: movieID,
      length: parseInt(data.data.data)
    }
    setMovieLengthList([...movieLengthList, movieEntry])
    setMarathonLength(marathonLength + parseInt(data.data.data))
  })
  .catch( err => console.log(err))
}

export function getSkills(setter) {
  axios({
    method: 'GET',
    url: URL + "/api/skills"
  })
  .then(res => {
    setter(res.data.skills)
  })
  .catch(err => {
    console.log(err)
  })
}

export function getWebsites(setter) {
  axios({
    method: 'GET',
    url: URL + "/api/websites"
  })
  .then(res => {
    setter(res.data.websites)
  })
  .catch(err => {
    console.log(err)
  })
}

export function getWork(setter) {
  axios({
    method: 'GET',
    url: URL + "/api/work"
  })
  .then(res => {
    setter(res.data.work)
  })
  .catch(err => {
    console.log(err)
  })
}

  export function getGasReport(setter) {
    axios({
      method: 'GET',
      url: URL + "/api/gas/report"
    })
    .then(res => {
      setter(res.data.report)
    })
    .catch(err => {
      console.log(err)
    })
}