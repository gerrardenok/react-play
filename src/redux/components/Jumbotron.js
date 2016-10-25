import React from 'react';
import {Link} from 'react-router';

const JumbotronComponent = () => (
  <div className="jumbotron">
    <h1 className="display-3">React-play</h1>
    <p className="lead">
      Cras justo odio, dapibus ac facilisis in, egestas eget quam.
      Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,
      ut fermentum massa justo sit amet risus.
    </p>
    <p>
      <Link className="btn btn-lg btn-success" to="/users">Go to users list</Link>
    </p>
  </div>
);
JumbotronComponent.defaultProps = {};

export default JumbotronComponent;
