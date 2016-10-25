import React from 'react';
import {connect} from 'react-redux';
import Jumbotron from '../components/Jumbotron';
import Marketing from '../components/Marketing';

const HomePageContainer = () => (
  <div>
    <Jumbotron/>
    <Marketing/>
  </div>
);

HomePageContainer.defaultProps = {};

export default connect()(HomePageContainer);
