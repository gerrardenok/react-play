import React, {Component, PropTypes} from 'react';
import {FormGroup, Col, Button} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';

class FiltersFormComponent extends Component {

  static defaultProps = {
    onFilters: () => {}
  };

  static propTypes = {
    onFilters: PropTypes.func
  };

  render() {
    let {handleSubmit, onSubmit, onFilters, reset} = this.props,
      handleFilters = handleSubmit((data) => {
        onFilters(data);
      }),
      handleReset = (e) => {
        reset();
        setTimeout(()=>{ // TODO: Refactoring see https://github.com/erikras/redux-form/issues/202
          window.document.querySelector('[type="submit').click();
        });
      };
    return (
      <form onSubmit={handleFilters}>
        <Col md={4}>
          <FormGroup>
            <Field name="first" component="input" type="text" className="form-control" placeholder="First name"/>
          </FormGroup>
          <FormGroup>
            <Field name="last" component="input" type="text" className="form-control" placeholder="Last name"/>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Field name="email" component="input" type="email" className="form-control" placeholder="Email"/>
          </FormGroup>
          <FormGroup>
            <Field name="gender" component="select" className="form-control">
              <option value="" default>Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Field>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Field name="city" component="input" type="text" className="form-control" placeholder="City"/>
          </FormGroup>
          <FormGroup>
            <Button className="users-filters-search-btn" color="primary" type="submit">Search</Button>
            <Button className="users-filters-reset-btn" type="reset" onClick={handleReset}>Reset</Button>
          </FormGroup>
        </Col>
      </form>
    );
  }
}

export default reduxForm({
  form: 'UserFiltersForm'
})(FiltersFormComponent);
