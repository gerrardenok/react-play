import React, {Component} from 'react';
import {connect} from 'react-redux'
import Header from './Header'

@connect()
class LayoutContainer extends Component {
  render() {
    return (
      <div>
        <Header />
        <section className="container">
          <div className="row">
            <div className="col-md-12">
              {this.props.children}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default LayoutContainer;
