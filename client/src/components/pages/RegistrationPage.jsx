import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function RegisterForm() {
  return (
    <Form className="p-4 border rounded" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2 className="text-center mb-4">Регистрация</h2>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Enter email" required />
        <Form.Text className="text-muted">
          Ваш email будет использоваться для входа в аккаунт.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="password"
          placeholder="Password"
          required
          aria-describedby="passwordHelpBlock"
        />
        <Form.Text id="passwordHelpBlock" muted>
          Ваш пароль должен быть не менее 8 символов и содержать буквы, цифры и
          специальные символы.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formConfirmPassword">
        <Form.Control type="password" placeholder="Confirm Password" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formSecretKey">
        <Form.Control
          type="password"
          placeholder="Enter your secret key"
          required
          aria-describedby="secretKeyHelpBlock"
        />
        <Form.Text id="secretKeyHelpBlock" muted></Form.Text>
      </Form.Group>

      {/* Terms Checkbox */}
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="I agree to the Terms and Conditions"
          required
        />
      </Form.Group>

      {/* Submit Button */}
      <Button variant="primary" type="submit" className="w-100">
        Register
      </Button>

      {/* Login Link */}
      <div className="text-center mt-3">
        Already have an account? <a href="/login">Login</a>
      </div>
    </Form>
  );
}

export default RegisterForm;
