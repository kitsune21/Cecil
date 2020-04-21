import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

const Jan = {name: 'January', number: 0}
const Feb = {name: 'February', number: 1}
const Mar = {name: 'March', number: 2}
const Apr = {name: 'April', number: 3}
const May = {name: 'May', number: 4}
const Jun = {name: 'June', number: 5}
const Jul = {name: 'July', number: 6}
const Aug = {name: 'August', number: 7}
const Sep = {name: 'September', number: 8}
const Oct = {name: 'October', number: 9}
const Nov = {name: 'November', number: 10}
const Dec = {name: 'December', number: 11}

// {id: , name: '', location: '', startTime: 0, endTime: 0, shadow: 0, price: 0, months: []},

const fish = [
  {id: 1, name: 'Bitterling', location: 'River', startTime: 0, endTime: 0, shadow: 1, price: 900, months: [Jan, Feb, Mar, Nov, Dec]},
  {id: 2, name: 'Pale Chub', location: 'River', startTime: 9, endTime: 15, shadow: 1, price: 200, months: []},
  {id: 3, name: 'Crucian Carp', location: 'River', startTime: 0, endTime: 0, shadow: 1, price: 160, months: []},
  {id: 4, name: 'Dace', location: 'River', startTime: 16, endTime: 9, shadow: 3, price: 240, months: []},
  {id: 5, name: 'Carp', location: 'Pond', startTime: 0, endTime: 0, shadow: 4, price: 300, months: []},
  {id: 6, name: 'Koi', location: 'Pond', startTime: 16, endTime: 9, shadow: 4, price: 4000, months: []},
  {id: 7, name: 'Goldfish', location: 'Pond', startTime: 0, endTime: 0, shadow: 1, price: 1300, months: []},
  {id: 8, name: 'Pop-eyed Goldfish', location: 'Pond', startTime: 9, endTime: 16, shadow: 1, price: 1300, months: []},
  {id: 9, name: 'Ranchu Goldfish', location: 'Pond', startTime: 9, endTime: 16, shadow: 1, price: 4500, months: []},
  {id: 10, name: 'Killifish', location: 'Pond', startTime: 0, endTime: 0, shadow: 1, price: 300, months: [Apr, May, Jun, Jul, Aug]},
  {id: 11, name: 'Crawfish', location: 'Pond', startTime: 0, endTime: 0, shadow: 3, price: 200, months: [Apr, May, Jun, Jul, Aug, Sep]},
  {id: 12, name: 'Soft-shelled Turtle', location: 'River', startTime: 16, endTime: 9, shadow: 0, price: 3750, months: [Aug, Sep]},
  {id: 13, name: 'Snapping Turtle', location: 'River', startTime: 21, endTime: 4, shadow: 0, price: 5000, months: [Apr, May, Jun, Jul, Aug, Sep, Oct]},
  {id: 14, name: 'Tadpole', location: 'Pond', startTime: 0, endTime: 0, shadow: 1, price: 100, months: [Mar, Apr, May, Jun, Jul]},
  {id: 15, name: 'Frog', location: 'Pond', startTime: 0, endTime: 0, shadow: 2, price: 120, months: [May, Jun, Jul, Aug]},
  {id: 16, name: 'Freshwater Goby', location: 'River', startTime: 16, endTime: 9, shadow: 2, price: 400, months: []},
  {id: 17, name: 'Loach', location: 'River', startTime: 0, endTime: 0, shadow: 2, price: 400, months: [Mar, Apr, May]},
  {id: 18, name: 'Catfish', location: 'Pond', startTime: 16, endTime: 9, shadow: 0, price: 800, months: [May, Jun, Jul, Aug, Sep, Oct]},
  {id: 19, name: 'Giant Snakehead', location: 'Pond', startTime: 9, endTime: 16, shadow: 5, price: 5500, months: [Jun, Jul, Aug]},
  {id: 20, name: 'Bluegill', location: 'River', startTime: 9, endTime: 16, shadow: 2, price: 180, months: []},
  {id: 21, name: 'Yellow Perch', location: 'River', startTime: 0, endTime: 0, shadow: 3, price: 300, months: [Jan, Feb, Mar, Oct, Nov, Dec]},
  {id: 22, name: 'Black Bass', location: 'River', startTime: 0, endTime: 0, shadow: 4, price: 400, months: []},
  {id: 23, name: 'Tilapia', location: 'River', startTime: 0, endTime: 0, shadow: 0, price: 800, months: [May, Jun, Jul, Aug, Sep]},
  {id: 24, name: 'Pike', location: 'River', startTime: 0, endTime: 0, shadow: 5, price: 1800, months: [Sep, Oct, Nov, Dec]},
  {id: 25, name: 'Pond Smelt', location: 'River', startTime: 0, endTime: 0, shadow: 2, price: 320, months: [Jan, Feb, Dec]},
  {id: 26, name: 'Sweetfish', location: 'River', startTime: 0, endTime: 0, shadow: 3, price: 900, months: [Jul, Aug, Sep]},
  {id: 27, name: 'Cherry Salmon', location: 'River (Clifftop)', startTime: 16, endTime: 9, shadow: 3, price: 1000, months: [Mar, Apr, May, Jun, Sep, Oct, Nov]},
  {id: 28, name: 'Char', location: 'River (Clifftop)', startTime: 16, endTime: 9, shadow: 3, price: 3800, months: [Mar, Apr, May, Jun, Sep, Oct, Nov]},
  {id: 29, name: 'Golden Trout', location: 'River (Clifftop)', startTime: 16, endTime: 9, shadow: 3, price: 15000, months: [Mar, Apr, Jun, Sep, Oct, Nov]},
  {id: 30, name: 'Stringfish', location: 'River (Clifftop)', startTime: 16, endTime: 9, shadow: 5, price: 15000, months: [Jan, Feb, Mar, Dec]},
  {id: 31, name: 'Salmon', location: 'River (Mouth)', startTime: 0, endTime: 0, shadow: 2, price: 700, months: [Sep]},
  {id: 32, name: 'King Salmon', location: 'River (Mouth)', startTime: 0, endTime: 0, shadow: 1, price: 1800, months: [Sep]},
  {id: 33, name: 'Mitten Crab', location: 'River', startTime: 16, endTime: 9, shadow: 2, price: 2000, months: [Sep, Oct, Nov]},
  {id: 34, name: 'Guppy', location: 'River', startTime: 9, endTime: 16, shadow: 1, price: 2000, months: [Apr, May, Jun, Jul, Aug, Sep, Oct, Nov]},
  {id: 35, name: 'Nibble Fish', location: 'River', startTime: 9, endTime: 16, shadow: 2, price: 1500, months: [May, Jun, Jul, Aug, Sep]},
  {id: 36, name: 'Angelfish', location: 'River', startTime: 16, endTime: 9, shadow: 2, price: 3000, months: [May, Jun, Jul, Aug, Sep, Oct]},
  {id: 37, name: 'Betta', location: 'River', startTime: 9, endTime: 16, shadow: 2, price: 2500, months: [May, Jun, Jul, Aug, Sep, Oct]},
  {id: 38, name: 'Neon Tetra', location: 'River', startTime: 9, endTime: 16, shadow: 1, price: 500, months: [Apr, May, Jun, Jul, Aug, Sep, Oct, Nov]},
  {id: 39, name: 'Rainbowfish', location: 'River', startTime: 9, endTime: 16, shadow: 2, price: 800, months: [May, Jun, Jul, Aug, Sep, Oct]},
  {id: 40, name: 'Piranha', location: 'River', startTime: (9, 21), endTime: (16, 4), shadow: 2, price: 2500, months: [Jun, Jul, Aug, Sep]},
  {id: 41, name: 'Arowana', location: 'River', startTime: 16, endTime: 9, shadow: 4, price: 10000, months: [Jun, Jul, Aug, Sep]},
  {id: 42, name: 'Dorado', location: 'River', startTime: 4, endTime: 21, shadow: 5, price: 15000, months: [Jun, Jul, Aug, Sep]},
  {id: 43, name: 'Gar', location: 'Pond', startTime: 16, endTime: 9, shadow: 6, price: 6000, months: [Jul, Aug, Sep, Oct]},
  {id: 44, name: 'Arapaima', location: 'River', startTime: 16, endTime: 9, shadow: 0, price: 10000, months: [Jun, Jul, Aug, Sep]},
  {id: 45, name: 'Saddled Bichir', location: 'River', startTime: 21, endTime: 4, shadow: 5, price: 4000, months: [Jun, Jul, Aug, Sep]},
  {id: 46, name: 'Sturgeon', location: 'River (Mouth)', startTime: 0, endTime: 0, shadow: 6, price: 10000, months: [Jan, Feb, Mar, Sep, Oct, Nov, Dec]},
  {id: 47, name: 'Sea Butterfly', location: 'Sea', startTime: 0, endTime: 0, shadow: 1, price: 1000, months: [Jan, Feb, Mar, Dec]},
  {id: 48, name: 'Sea Horse', location: 'Sea', startTime: 0, endTime: 0, shadow: 1, price: 1100, months: [Apr, May, Jun, Jul, Aug, Sep, Oct, Nov]},
  {id: 49, name: 'Clown Fish', location: 'Sea', startTime: 0, endTime: 0, shadow: 1, price: 650, months: [Apr, May, Jun, Jul, Aug, Sep]},
  {id: 50, name: 'Surgeonfish', location: 'Sea', startTime: 0, endTime: 0, shadow: 2, price: 1000, months: [Apr, May, Jun, Jul, Aug, Sep]},
  {id: 51, name: 'Butterfly Fish', location: 'Sea', startTime: 0, endTime: 0, shadow: 2, price: 1000, months: [Apr, May, Jun, Jul, Aug, Sep]},
  {id: 52, name: 'Napoleonfish', location: 'Sea', startTime: 4, endTime: 21, shadow: 6, price: 10000, months: [Jul, Aug]},
  {id: 53, name: 'Zebra Turkeyfish', location: 'Sea', startTime: 0, endTime: 0, shadow: 500, price: 500, months: [Apr, May, Jul, Aug, Sep, Oct, Nov]},
  {id: 54, name: 'Blowfish', location: 'Sea', startTime: 18, endTime: 4, shadow: 3, price: 5000, months: [Jan, Feb, Nov, Dec]},
  {id: 55, name: 'Puffer Fish', location: 'Sea', startTime: 0, endTime: 0, shadow: 3, price: 250, months: [Jul, Aug, Sep]},
  {id: 56, name: 'Anchovy', location: 'Sea', startTime: 4, endTime: 21, shadow: 2, price: 200, months: []},
  {id: 57, name: 'Horse Mackerel', location: 'Sea', startTime: 0, endTime: 0, shadow: 2, price: 150, months: []},
  {id: 58, name: 'Barred Knifejaw', location: 'Sea', startTime: 0, endTime: 0, shadow: 3, price: 5000, months: [Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov]},
  {id: 59, name: 'Sea Bass', location: 'Sea', startTime: 0, endTime: 0, shadow: 5, price: 400, months: []},
  {id: 60, name: 'Red Snapper', location: 'Sea', startTime: 0, endTime: 0, shadow: 3, price: 3000, months: []},
  {id: 61, name: 'Dab', location: 'Sea', startTime: 0, endTime: 0, shadow: 3, price: 300, months: [Jan, Feb, Mar, Apr, Oct, Nov, Dec]},
  {id: 62, name: 'Olive Flounder', location: 'Sea', startTime: 0, endTime: 0, shadow: 4, price: 800, months: []},
  {id: 63, name: 'Squid', location: 'Sea', startTime: 0, endTime: 0, shadow: 3, price: 500, months: [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Dec]},
  {id: 64, name: 'Moray Eel', location: 'Sea', startTime: 0, endTime: 0, shadow: 5, price: 2000, months: [Aug, Sep, Oct]},
  {id: 65, name: 'Ribbon Eel', location: 'Sea', startTime: 0, endTime: 0, shadow: 'Skinny', price: 600, months: [Jun, Jul, Aug, Sep, Oct]},
  {id: 66, name: 'Tuna', location: 'Pier', startTime: 0, endTime: 0, shadow: 5, price: 7000, months: [Jan, Feb, Mar, Apr, Nov, Dec]},
  {id: 67, name: 'Blue Marlin', location: 'Pier', startTime: 0, endTime: 0, shadow: 5, price: 10000, months: [Jan, Feb, Mar, Apr, Nov, Dec]},
  {id: 68, name: 'Giant Trevally', location: 'Pier', startTime: 0, endTime: 0, shadow: 4, price: 4500, months: [May, Jun, Jul, Aug, Sep, Oct]},
  {id: 69, name: 'Mahi-Mahi', location: 'Pier', startTime: 0, endTime: 0, shadow: 4, price: 6000, months: [May, Jun, Jul, Aug, Sep, Oct]},
  {id: 70, name: 'Ocean Sunfish', location: 'Sea', startTime: 4, endTime: 21, shadow: 'Fin', price: 4000, months: [Jul, Aug, Sep]},
  {id: 71, name: 'Ray', location: 'Sea', startTime: 4, endTime: 21, shadow: 5, price: 3000, months: [Aug, Sep, Oct, Nov]},
  {id: 72, name: 'Saw Shark', location: 'Sea', startTime: 16, endTime: 9, shadow: 'Fin', price: 12000, months: [Jun, Jul, Aug, Sep]},
  {id: 73, name: 'Hammerhead Shark', location: 'Sea', startTime: 16, endTime: 9, shadow: 'Fin', price: 8000, months: [Jun, Jul, Aug, Sep]},
  {id: 74, name: 'Great White Shark', location: 'Sea', startTime: 16, endTime: 9, shadow: 'Fin', price: 15000, months: [Jun, Jul, Aug, Sep]},
  {id: 75, name: 'Whale Shark', location: 'Sea', startTime: 16, endTime: 9, shadow: 'Fin', price: 13000, months: [Jun, Jul, Aug, Sep]},
  {id: 76, name: 'Suckerfish', location: 'Sea', startTime: 0, endTime: 0, shadow: 'Fin', price: 1500, months: [Jun, Jul, Aug, Sep]},
  {id: 77, name: 'Football Fish', location: 'Sea', startTime: 16, endTime: 9, shadow: 5, price: 2500, months: [Jan, Feb, Mar, Nov, Dec]},
  {id: 78, name: 'Oarfish', location: 'Sea', startTime: 0, endTime: 0, shadow: 6, price: 9000, months: [Jan, Feb, Mar, Apr, May, Dec]},
  {id: 79, name: 'Barreleye Fish', location: 'Sea', startTime: 21, endTime: 4, shadow: 2, price: 15000, months: []},
  {id: 80, name: 'Coelacanth', location: 'Sea (Rain)', startTime: 0, endTime: 0, shadow: 6, price: 15000, months: []},
];


const columns= [
  {
    Header: 'Name',
    accessor: 'name'  
  },
  {
    Header: 'Location',
    accessor: 'location',
  },
  {
    Header: 'Start Time',
    accessor: 'startTime'
  },
  {
    Header: 'End Time',
    accessor: 'endTime',
  },
  {
    Header: 'Shadow',
    accessor: 'shadow',
  },
  {
    Header: 'Price',
    accessor: 'price',
  },
];

class Ac extends Component {

  state = {
    filterAddAllDay: false,
    filterAddTimeSpecific: true,
    filterLocation: 'All',
    filterBellMin: 0
  }

  checkMonth = (months, myTime) => {
    let returnValue = false;
    months.forEach(month => {
      if(month.number === myTime.getMonth()){
        returnValue = true;
      }
    })
    return returnValue;
  }

  checkLocation = myFish => {
    if(this.state.filterLocation === 'All') {
      return true;
    } else if((this.state.filterLocation === 'Sea') && (myFish.location === 'Sea' || myFish.location === 'Pier' || myFish.location === 'Sea (Rain)')) {
      return true;
    } else if((this.state.filterLocation === 'Pond') && myFish.location === 'Pond') {
      return true;
    } else if ((this.state.filterLocation === 'River') && (myFish.location ==='River' || myFish.location === 'River (Clifftop)' || myFish.location === 'River (Mouth)')) {
      return true;
    }
  }

  returnData = () => {
    let myTime = new Date();
    let returnFish = [];
    fish.forEach(myFish => {
      if(myFish.price >= this.state.filterBellMin) {
        if(this.checkLocation(myFish)){
          if(myFish.months.length === 0 || this.checkMonth(myFish.months, myTime)) {
            if(myFish.startTime === 0 && this.state.filterAddAllDay) {
              returnFish.push(myFish)
            } else if(myFish.startTime !== 0 && this.state.filterAddTimeSpecific) {
              if(myTime.getHours() >= myFish.startTime && myTime.getHours() <= myFish.endTime) {
                returnFish.push(myFish)
              } else if(myTime.getHours() >= myFish.startTime && myFish.endTime <= myFish.startTime) {
                returnFish.push(myFish)
              }
            }
          }
        }
      }
    })
    return returnFish
  }

  handleAllDayChange = () => {
    this.setState({filterAddAllDay: !this.state.filterAddAllDay})
  }

  handleLocationChange = e => {
    this.setState({filterLocation: e.target.value})
  }

  handleBellMinChange = e => {
    this.setState({filterBellMin: e.target.value})
  }

  handleOnlyAllDayChange = () => {
    this.setState({filterAddTimeSpecific: !this.state.filterAddTimeSpecific})
  }

  render() {
    return(
      <>
        <label>Filter Add All Day Fish: <input type='checkbox' defaultChecked={this.state.filterAddAllDay} onChange={this.handleAllDayChange}/></label>
        <label>Filter Add Time Specific Fish: <input type='checkbox' defaultChecked={this.state.filterAddTimeSpecific} onChange={this.handleOnlyAllDayChange}/></label>
        <label>Filter Location: <select value={this.state.filterLocation} onChange={this.handleLocationChange}><option>All</option><option>River</option><option>Sea</option><option>Pond</option></select></label>
        <label>Bell Minimum: <input type='range' min={0} max={15000} value={this.state.filterBellMin} onChange={this.handleBellMinChange}/>   <p style={{display: 'inline'}}>  {this.state.filterBellMin}</p></label>
        <ReactTable columns={columns} data={this.returnData()}/>
      </>
    )
  }
}

export default Ac;