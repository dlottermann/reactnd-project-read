import React, { Component } from 'react';
import Nav from './Nav'
import { Post } from './Post';

class App extends Component {

  render() {
    return (
      <div>
        <Nav />
        <div className='container'>
          <Post />
          </div>
      </div>
    );
  }
}

export default App;
