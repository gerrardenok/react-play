import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {FormGroup, Col, Button} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';

/**
 * TODO: refactoring
 * */
class FiltersFormComponent extends Component {

  onSubmit = (e) => {
    e.preventDefault();
    this.props.setFilters(this.props.formData);
  };

  handleReset = () => {
    this.props.initialize({});
  };

  componentWillMount() {
    this.props.initialize(this.props.filters);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
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
              <option default>Gender</option>
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
            <Button className="users-filters-reset-btn" type="reset" onClick={this.handleReset}>Reset</Button>
          </FormGroup>
        </Col>
      </form>
    );
  }

}

FiltersFormComponent.defaultProps = {
  setFilter: () => {
  }
};

FiltersFormComponent.propTypes = {
  setFilters: PropTypes.func
};

export const FormName = "UserFiltersForm";

const mapStateToProps = (state) => {
  let filters =state.users.filters || {};
  let form = {};
  if(state.form[FormName])
    if(state.form[FormName].values)
      form = state.form[FormName].values;
  return {formData: form, filters};
};

export default reduxForm({
  form: FormName
})(connect(mapStateToProps)(FiltersFormComponent));
