import React from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';

const LoginFormComponent = () => (
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
LoginFormComponent.defaultProps = {};

export default LoginFormComponent
