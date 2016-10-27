import React, {Component, PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Button, FormGroup} from 'reactstrap';

@reduxForm({
  form: 'SignInForm'
})
class SignInForm extends Component {

  static propTypes = {
    onSignIn: PropTypes.func,
    authError: PropTypes.bool
  };

  render() {
    let {handleSubmit, onSignIn, authError} = this.props;

    return (
      <form className="form-inline" onSubmit={handleSubmit(({username, password})=> {onSignIn(username, password)})}>
        <FormGroup>
          <Field name="username" component="input" type="text" className="form-control" placeholder="admin"/>
        </FormGroup>
        {' '}
        <FormGroup>
          <Field name="password" component="input" type="password" className="form-control" placeholder="1111"/>
        </FormGroup>
        {' '}
        <Button type="submit">Sign in</Button>
        {(authError) ? (
          <div className="help-block auth-error-msg">Invalid username or password. (Enter placeholder values)</div>
        ) : '' }
      </form>
    );
  }
}

export default SignInForm
