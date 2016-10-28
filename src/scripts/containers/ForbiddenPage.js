import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

@connect()
class ForbiddenPage extends Component {
  render() {
    return (
      <div className="text-center">
        <h1>Oops!</h1>
        <h2>403 Forbidden</h2>
        <p className="error-details">
          Sorry, you can't access to requested page!
        </p>
        <p>
          <Link className="btn btn-md btn-info" to="/">Go to login</Link>
        </p>
      </div>
    );
  }
}

export default ForbiddenPage;
