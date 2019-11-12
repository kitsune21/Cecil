import React, { Component } from 'react';
import Text from './Entry_Types/Text';
import Image from './Entry_Types/Image';
import Video from './Entry_Types/Video';
import Link from './Entry_Types/Link';

//entry types: {id: , type:'', },
// const entry_types = [
//   {id: 1, type:'text', },
//   {id: 2, type:'image', },
//   {id: 3, type:'video', },
//   {id: 4, type:'link', },
// ];

//blog data: {id: , blog_id: , entry_type_id: , value:'', },
const blog_data = [
  {id: 1, blog_id: 1, entry_type_id: 1, value:'Test', },
  {id: 2, blog_id: 1, entry_type_id: 2, value:'https://bit.ly/2pWiJDy', },
  {id: 3, blog_id: 1, entry_type_id: 3, value:'https://www.youtube.com/embed/NjeUxHpDZIw', },
  {id: 4, blog_id: 1, entry_type_id: 4, value:'https://amazon.com/', },
  {id: 5, blog_id: 2, entry_type_id: 1, value:'Test', },
  {id: 6, blog_id: 2, entry_type_id: 1, value:'Test', },
  {id: 7, blog_id: 2, entry_type_id: 1, value:'Test', },
]; 


class BlogEntry extends Component {

  componentDidUpdate() {
    console.log(this.props.blog_id)
  }

   renderEntry = (data) => {
    switch(data.entry_type_id) {
      case 1:
        return(<Text key={data.id} value={data.value} />);
      case 2:
        return(<Image key={data.id} value={data.value} />);
      case 3:
        return(<Video key={data.id} value={data.value} />);
      case 4:
        return(<Link key={data.id} value={data.value} />);
      default:
        break;
    }
  }

  render() {
    return(
      <div>
        {
          blog_data.map( data => 
            data.blog_id === this.props.blog_id ? this.renderEntry(data) : null
          )
        }
      </div>
    )
  }
}

export default BlogEntry;