import React from 'react';
import axios from 'axios';
import {getter, getGasReport} from '../../API/api'

function GasTracker() {
  const [filterOption, setFilterOption] = React.useState('Date')
  const [filterDirection, setFilterDirection] = React.useState(false) /* true is least to great */
  const [reciepts, setReciepts] = React.useState([])
  const [report, setReport] = React.useState()

  React.useEffect(() => {
    getter(setReciepts, "/api/gas/reciepts")
    getGasReport(setReport)
  }, [])

  const returnFormattedDate = myDate => {
    let newDate = new Date(myDate);
    return `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`
  }

  const filterReciepts = () => {
    if(filterDirection) {
      return reciepts.sort((a, b) => (a[filterOption] < b[filterOption]) ? 1 : -1);
    } else {
      return reciepts.sort((a, b) => (a[filterOption] < b[filterOption]) ? 1 : -1).reverse();
    }
  }

  const updateFilter = e => {
    //if they select the current one, just change the direction, else change option and direction
    if(filterOption === e.target.id) {
      setFilterDirection(!filterDirection)
    } else {
      setFilterDirection(false)
      setFilterOption(e.target.id)
    }
  }

  const displayDirection = id => {
    if(filterOption === id) {
      if(filterDirection) {
        return ' (DOWN)'
      } else {
        return ' (UP)'
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let newReciept = {
      myDate: e.target.elements.myDate.value,
      Total_Sale: e.target.elements.Total_Sale.value,
      Gallons: e.target.elements.Gallons.value,
      Price: e.target.elements.Price.value,
      Grade: e.target.elements.Grade.value,
      Location: e.target.elements.Location.value
    }
    axios({
      method: "POST",
      url: 'https://6f4jesporh.execute-api.us-west-2.amazonaws.com/api/gas/reciepts/add',
      data: newReciept
    })
    .then(data => {
      newReciept.ID = reciepts.reverse()[0].ID + 1;
      newReciept.Date = newReciept.myDate;
      setReciepts([...reciepts, newReciept])
    })
  }

  return(
    <>
      <div>
        <h3>Submit Reciept:</h3>
        <form onSubmit={handleSubmit}>
          <label>Date: 
            <input id='myDate' type='date' defaultValue={new Date().toLocaleDateString('en-CA')}/>
          </label>
          <label>Total Sale: 
            <input id='Total_Sale' type='text'/>
          </label>
          <label>Gallons: 
            <input id='Gallons' type='text'/>
          </label>
          <label>Price: 
            <input id='Price' type='text'/>
          </label>
          <label>Grade: 
            <input id='Grade' type='text'/>
          </label>
          <label>Location: 
            <input id='Location' type='text'/>
          </label>
          <button type="submit" style={{padding: '5px', border: '5px solid black', borderRadius: '10px'}}>Submit</button>
        </form>
      </div>
      <div>
        <h3>Reciepts:</h3>
        <table>
          <thead>
            <tr>
              <th id='myDate' onClick={updateFilter}>Date{displayDirection('myDate')}</th>
              <th id='Total_Sale' onClick={updateFilter}>Total Sale{displayDirection('Total_Sale')}</th>
              <th id='Gallons' onClick={updateFilter}>Gallons{displayDirection('Gallons')}</th>
              <th id='Price' onClick={updateFilter}>Price{displayDirection('Price')}</th>
              <th>Grade</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {
              reciepts !== undefined ?
              filterReciepts().map(entry => 
                <tr key={entry.ID}>
                  <td>{returnFormattedDate(entry.Date)}</td>
                  <td>${entry.Total_Sale}</td>
                  <td>{entry.Gallons}</td>
                  <td>${entry.Price}</td>
                  <td>{entry.Grade}</td>
                  <td>{entry.Location}</td>
                </tr>
              ) :
              <tr>
                <td>Loading...</td>
              </tr>
            }
          </tbody>
        </table>
        <div>
          <h3>Report:</h3>
          {
            report ?
            <>
            <p>Average days between: {report.averageDays}</p>
            <p>Mean Sale: ${report.meanSale.toFixed(3)}</p>
            <p>Mean Gallons: {report.meanGallons}</p>
            <p>Highest Price: ${report.highPrice}</p>
            <p>Lowest Price: ${report.lowPrice}</p>
            <p>Mean Price: ${report.meanPrice.toFixed(3)}</p>
            <p>Favorite Location: {report.favoriteLocation}</p>
            </>
            : <p>Loading...</p>
          }
        </div>
      </div>
      
    </>
  )
}

export default GasTracker;