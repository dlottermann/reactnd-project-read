import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PageError extends Component {
  render(){
    return(
      <div className="main-post">
        <h1 className='text-center'>404</h1>
        <h3 className='text-center'>Sorry, this page not exist!</h3>
        <br></br>
        <br></br>
        <div className='row'>
          <Link className="edit-post" to='/'>Go Home</Link>
        </div>
      </div>
    )
  }
}

export default PageError