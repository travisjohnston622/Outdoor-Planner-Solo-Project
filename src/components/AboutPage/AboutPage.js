import React, { Component }from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class AboutPage extends Component {

  onChange = key => event => {
    this.setState(
      {
        ...this.state,
        [key]: event.target.value
      },
      () => {
        console.log(this.state);
      }
    );
  };

  search = event => {
    this.props.dispatch({
      type:"FETCH_OPEN_CAGE", 
      payload: {search_string: this.state.search_string}
    });
  };

  render() {
    return(
  
      <div>
        <div>
          <input type="text" onChange={this.onChange('search_string')}></input>
          <button onClick={this.search}>SEARCH</button>
        </div>

        <div>
          <p>
            This about page is for anyone to read!
          </p>
        </div>
      </div>
    );
  }
}
  

export default connect(mapStoreToProps)(AboutPage);