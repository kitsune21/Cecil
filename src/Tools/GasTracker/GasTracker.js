import React, { Component } from 'react';
import axios from 'axios';

class GasTracker extends Component {

  state = {
    filterOption: 'Date',
    filterDirection: false /* true is least to great */,
    recieptObject: {
      myDate: '',
      Total_Sale: '',
      Gallons: '',
      Price: '',
      Grade: '',
      Location: ''
    },
    recieptObjectBlank: {
      myDate: '',
      Total_Sale: '',
      Gallons: '',
      Price: '',
      Grade: '',
      Location: ''
    }
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: "http://localhost:3001/api/gas/reciepts"
    })
    .then(data => {
      this.setState({reciepts: data.data.reciepts})
      this.setState({report: data.data.report})
    })
    .catch(err => {
      console.log(err)
    })
  }

  returnFormattedDate = myDate => {
    let newDate = new Date(myDate);
    return `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`
  }

  filterReciepts = () => {
    if(this.state.filterDirection) {
      return this.state.reciepts.sort((a, b) => (a[this.state.filterOption] < b[this.state.filterOption]) ? 1 : -1);
    } else {
      return this.state.reciepts.sort((a, b) => (a[this.state.filterOption] < b[this.state.filterOption]) ? 1 : -1).reverse();
    }
  }

  updateFilter = e => {
    //if they select the current one, just change the direction, else change option and direction
    if(this.state.filterOption === e.target.id) {
      this.setState({filterDirection: !this.state.filterDirection});
    } else {
      this.setState({filterOption: e.target.id, filterDirection: false});
    }
  }

  displayDirection = id => {
    if(this.state.filterOption === id) {
      if(this.state.filterDirection) {
        return ' (DOWN)'
      } else {
        return ' (UP)'
      }
    }
  }

  handleSubmit = (event) => {
    console.log(event)
    axios({
      method: "POST",
      url: 'http://localhost:3001/api/gas/reciepts/add',
      data: {...this.state.recieptObject}
    })
    .then(data => {
      console.log(data)
      let newReciept = this.state.recieptObject;
      newReciept.ID = this.state.reciepts.reverse()[0].ID + 1;
      newReciept.Date = newReciept.myDate;
      this.setState({reciepts: [...this.state.reciepts, newReciept]})
      this.setState({recieptObject: this.state.recieptObjectBlank})
    })
    event.preventDefault();
  }

  updateState = ({target}) => {
    this.setState({recieptObject: {...this.state.recieptObject, [target.id]: target.value}});
  }

  render() {
    return(
      <>
        <div>
          <table>
            <thead>
              <tr>
                <th id='myDate' onClick={this.updateFilter}>Date{this.displayDirection('myDate')}</th>
                <th id='Total_Sale' onClick={this.updateFilter}>Total Sale{this.displayDirection('Total_Sale')}</th>
                <th id='Gallons' onClick={this.updateFilter}>Gallons{this.displayDirection('Gallons')}</th>
                <th id='Price' onClick={this.updateFilter}>Price{this.displayDirection('Price')}</th>
                <th>Grade</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.reciepts !== undefined ?
                this.filterReciepts().map(entry => 
                  <tr key={entry.ID}>
                    <td>{this.returnFormattedDate(entry.Date)}</td>
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
            <h3>Data</h3>
            {
              this.state.report ?
              <>
              <p>Average days between: {this.state.report.averageDays}</p>
              <p>Mean Sale: ${this.state.report.meanSale.toFixed(3)}</p>
              <p>Mean Gallons: {this.state.report.meanGallons}</p>
              <p>Highest Price: ${this.state.report.highPrice}</p>
              <p>Lowest Price: ${this.state.report.lowPrice}</p>
              <p>Mean Price: ${this.state.report.meanPrice.toFixed(3)}</p>
              <p>Favorite Location: {this.state.report.favoriteLocation}</p>
              </>
              : <p>Loading...</p>
            }
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>Date: 
            <input id='myDate' type='date' value={this.state.recieptObject.myDate} onChange={this.updateState}/>
          </label>
          <label>Total Sale: 
            <input id='Total_Sale' type='text' value={this.state.recieptObject.Total_Sale} onChange={this.updateState}/>
          </label>
          <label>Gallons: 
            <input id='Gallons' type='text' value={this.state.recieptObject.Gallons} onChange={this.updateState}/>
          </label>
          <label>Price: 
            <input id='Price' type='text' value={this.state.recieptObject.Price} onChange={this.updateState}/>
          </label>
          <label>Grade: 
            <input id='Grade' type='text' value={this.state.recieptObject.Grade} onChange={this.updateState}/>
          </label>
          <label>Location: 
            <input id='Location' type='text' value={this.state.recieptObject.Location} onChange={this.updateState}/>
          </label>
          {/* <label>Reciept: 
            <input id='Reciept' type='file' value={this.state.recieptObject.Reciept} onChange={this.updateState}/>
          </label> */}
          <input type="submit" />
        </form>
      </>
    )
  }
}

export default GasTracker;