import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

@connect()
class NotFoundPage extends Component {
  render() {
    return (
      <div className="text-center">
        <h1>Oops!</h1>
        <h2>404 Not Found</h2>
        <p className="error-details">
          Sorry, an error has occured, Requested page not found!
        </p>
        <p>
          <Link className="btn btn-md btn-info" to="/">Go to home</Link>
        </p>
      </div>
    );
  }
}

export default NotFoundPage;
