import React from 'react';
import {connect} from 'react-redux'
import Header from '../components/Header'

const LayoutComponent = (props) => (
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

LayoutComponent.defaultProps = {};

export default connect()(LayoutComponent);
