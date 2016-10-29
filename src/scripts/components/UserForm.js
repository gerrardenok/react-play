import React, {Component, PropTypes} from 'react';
import {FormGroup, Col, Button} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';

@reduxForm({ form: 'UsersForm' })
class UserFormComponent extends Component {

  componentWillMount() {
    this.props.initialize(this.props.user || {});
  }

  render() {
    let {handleSubmit} = this.props;
    return (
      <form className="row" onSubmit={handleSubmit(data => {})}>
        <Col md={12}>
          <FormGroup>
            <Field name="name.first" component="input" type="text" className="form-control" placeholder="First name"/>
          </FormGroup>
          <FormGroup>
            <Field name="name.last" component="input" type="text" className="form-control" placeholder="Last name"/>
          </FormGroup>
          <Button color="primary" type="submit">Submit</Button>
        </Col>
      </form>
    );
  }

}

export default UserFormComponent;
