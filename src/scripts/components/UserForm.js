import React, {Component, PropTypes} from 'react';
import {FormGroup, Col, Button, Label, Row} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router';

@reduxForm({ form: 'UsersForm' })
class UserFormComponent extends Component {

  componentWillMount() {
    this.props.initialize(this.props.user || {});
  }

  render() {
    let {handleSubmit, user, onUpdateUser} = this.props;
    return (
      <Row className="user-edit-form">
        <Col md={{ size: 8, offset: 2 }} >
          <form onSubmit={handleSubmit(data => { onUpdateUser(data) })}>
              <FormGroup row>
                <Label for="name.first" sm={2}>First name</Label>
                <Col sm={10}>
                  <Field name="name.first" component="input" type="text" className="form-control" placeholder="First name"/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="name.last" sm={2}>Last name</Label>
                <Col sm={10}>
                  <Field name="name.last" component="input" type="text" className="form-control" placeholder="Last name"/>
                </Col>
              </FormGroup>
            <FormGroup row>
              <Label for="phone" sm={2}>Phone</Label>
              <Col sm={10}>
                <Field name="phone" component="input" type="text" className="form-control" placeholder="Phone"/>
              </Col>
            </FormGroup>
              <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                  <Button color="primary" type="submit">Save</Button>
                  {' '}
                  <Link className="btn btn-secondary btn-md" to={`/user/${user.uid}`}>Cancel</Link>
                </Col>
              </FormGroup>
          </form>

        </Col>
      </Row>
    );
  }

  static propTypes = {
    user: PropTypes.object,
    onUpdateUser: PropTypes.func
  };

}

export default UserFormComponent;
