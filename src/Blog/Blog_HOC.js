import React, { Component } from 'react';
import BlogEntry from './Blog_Entry';
import { Link } from 'react-router-dom';

//categories: {id: , title:'', },
//blog: {id: , category_id: , title:'', external_link:'', },

const categories = [
  {id: 1, title:'Web Development', },
  {id: 2, title:'Game Development', },
  {id: 3, title:'Game Design', },
  {id: 4, title:'Random Thoughts', },
];

const db_blogs = [
  {id: 1, category_id: 1, title:'My Bootcamp Experience', external_link:'', },
  {id: 2, category_id: 2, title:'My Game Jam Experience', external_link:'', },
  {id: 3, category_id: 3, title:'The Importance of Animations in Fighting Games', external_link:'', },
  {id: 4, category_id: 4, title:'How to Improve as a TO in the Smash Community', external_link:'', },
];

class Blog extends Component {

  state = { activeBlog: 0, blogs: db_blogs};

  componentDidMount() {
    if(this.props.match.params.blogId) {
      this.setState({activeBlog: this.props.match.params.blogId})
    }
  }

  setActiveBlog = (newBlog) => {
    this.setState({activeBlog: newBlog})
  }

  handleClick = (e) => {
    this.setActiveBlog(e.target.id);
  }

  renderBlogs = (category_id) => {
    return(
      this.state.blogs.map( blog =>
        blog.category_id === category_id ? <li key={blog.id}><Link id={blog.id} to={`/blog/${blog.id}`} onClick={this.handleClick}>{blog.title}</Link></li> : null
      )
    )
  }

  renderActiveBlog = () => {
    if(this.state.activeBlog === 0){
      return null
    } else {
      return(
        <div>
          <h2>Active Entry:</h2>
          <BlogEntry myBlog={this.state.blogs[this.state.activeBlog - 1]} />
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        <h2>My Blog</h2>
        {
          categories.map( category =>
            <div key={category.id}>
              <h3>{category.title}</h3>
              <ul>
                {this.renderBlogs(category.id)}
              </ul>
            </div>
          )
        }
        {this.renderActiveBlog()}
      </div>
    )
  }
}

export default Blog;