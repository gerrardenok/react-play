import React from 'react';
import Header from './Header';
import Footer from './Footer';


class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <section className="container">
            <div className="row">
              <div className="col-md-12">
                <h1>List of users</h1>
              </div>
            </div>
        </section>
        <Footer/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
