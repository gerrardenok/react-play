import React, {Component} from 'react';
import {connect} from 'react-redux';
import Jumbotron from '../components/Jumbotron';
import Marketing from '../components/Marketing';

@connect()
class HomePageContainer extends Component {
  render() {
    return (
      <div>
        <Jumbotron/>
        <Marketing/>
      </div>
    );
  }
}

export default HomePageContainer;
