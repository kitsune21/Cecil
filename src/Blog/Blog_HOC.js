import React, { Component } from 'react';
import BlogEntry from './Blog_Entry';

//categories: {id: , title:'', },
//blog: {id: , category_id: , title:'', external_link:'', },

const categories = [
  {id: 1, title:'Web Development', },
  {id: 2, title:'Game Development', },
  {id: 3, title:'Game Design', },
  {id: 4, title:'Random Thoughts', },
];

const blogs = [
  {id: 1, category_id: 1, title:'My Bootcamp Experience', external_link:'', },
  {id: 2, category_id: 2, title:'My Game Jam Experience', external_link:'', },
  {id: 3, category_id: 3, title:'The Importance of Animations in Fighting Games', external_link:'', },
  {id: 4, category_id: 4, title:'How to Improve as a TO in the Smash Community', external_link:'', },
];

class Blog extends Component {

  state = { activeBlog: 1, };

  setActiveBlog = (newBlog) => {
    this.setState({activeBlog: newBlog})
  }

  renderBlogs = (category_id) => {
    return(
      blogs.map( blog =>
        blog.category_id === category_id ? <li key={blog.id}>{blog.title}</li> : null
      )
    )
  }

  renderActiveBlog = () => {
    return(
      <div>
        <h3>{blogs[this.state.activeBlog - 1].title}</h3>
        <BlogEntry blog_id={this.state.activeBlog} />
      </div>
    )
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
        <h2>Active Entry:</h2>
        {this.renderActiveBlog()}
      </div>
    )
  }
}

export default Blog;