import React from 'react';
import {connect} from 'react-redux'
import Header from './Header'

const LayoutContainer = (props) => (
  <div>
    <Header />
    <section className="container">
      <div className="row">
        <div className="col-md-12">
          {props.children}
        </div>
      </div>
    </section>
  </div>
);

LayoutContainer.defaultProps = {};

export default connect()(LayoutContainer);
