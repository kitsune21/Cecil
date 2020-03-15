import React, { Component } from 'react';
import axios from 'axios';

class BucketList extends Component { 

  state = {
  }

  componentDidMount() { 
    axios({
      method: "GET",
      url: 'http://localhost:3001/api/bucket_list'
    })
    .then(data => {
      this.setState({bucketListItems: data.data.listItems})
    })
    .catch(err =>{
      console.log(err)
    })
  }

  returnItemChecked = (myItem) => {
    var uncompletedItems = 0;
    let mySubItems = myItem.subItems;
    if(mySubItems.length === 0){
      return this.state.bucketListItems.filter(item => {return item.ID === myItem.ID})[0].completed
    } else {
      mySubItems.forEach(subItem => {
        if(!subItem.Completed){
          uncompletedItems += 1;
        }
      })
      if(uncompletedItems > 0){
        return false
      } else {
        return true
      }
    }
  }

  // updateSubItem = (e) => {
  //   let id = parseInt(e.target.id)
  //   this.setState(state => {
  //     const subItems = state.bucketListItems.map(item => {
  //       if(item.id === id){
  //         return {...item, completed: !item.completed}
  //       } else {
  //         return item
  //       }
  //     })
  //     return {
  //        subItems
  //     }
  //   })
  // }

  // updateItem = (e) => {
  //   let id = parseInt(e.target.id)
  //   this.setState(state => {
  //     const data = state.data.map(item => {
  //       if(item.id === id){
  //         return {...item, completed: !item.completed}
  //       } else {
  //         return item
  //       }
  //     })
  //     return {
  //        data
  //     }
  //   })
  // }

  render() {
    return(
      <div>
        <h2>Bucket List</h2>
        <ul>
        {
          this.state.bucketListItems ? 
          this.state.bucketListItems.map(item =>
            <React.Fragment key={item.ID}>
              <li><input id={item.ID} /*onChange={this.updateItem}*/ checked={this.returnItemChecked(item)} type='checkbox' disabled></input>  {item.Description}</li>
              { item.subItems.length > 0 ? 
              <ul>
                {
                  item.subItems.map(subItem => 
                    <li key={subItem.ID}><input id={subItem.ID} /*onChange={this.updateSubItem}*/ checked={subItem.Completed} type='checkbox' disabled></input>  {subItem.Description}</li>
                  )
                }
              </ul> : null}
            </React.Fragment>
          ) :
          <p>Loading...</p>
        }
        </ul>
      </div>
    )
  }
}

export default BucketList;