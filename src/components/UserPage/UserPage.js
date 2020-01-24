import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component { 
  
  goToNext = (event) => {
    // navigates to AdventuresPage 
    this.props.history.push('/new-adventure');
  }
  
  
  render() {
      return(
  
        <div>
          <h1 id="welcome">
            Welcome, {this.props.store.user.username}! 
          </h1>
          <div className="new-adventure.btn">
            <button onClick={this.goToNext}>Plan A New Adventure!</button>
          </div>
          
        </div>
      );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
