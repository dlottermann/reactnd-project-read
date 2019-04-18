import React, { Component } from 'react';
import NewComment from './NewComment';

class App extends Component {

  render() {
    return (
      <div>
         <h3>My project</h3> 
          <NewComment/>
      </div>
    );
  }
}

export default App;
