import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class LoginForm extends React.Component {
  render() {
    return (
      <Form inline>
        <FormGroup>
          <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
        </FormGroup>
        {' '}
        <FormGroup>
          <Input type="password" name="password" id="examplePassword" placeholder="Password" />
        </FormGroup>
        {' '}
        <Button>Sign in</Button>
      </Form>
    );
  }
}
