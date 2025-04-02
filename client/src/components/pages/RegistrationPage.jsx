import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function RegisterForm({ signupHandler }) {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };
    try {
      await signupHandler(user);
      alert('Регистрация успешна!');
    } catch (error) {
      console.error(error);
      alert('Ошибка регистрации');
    }
  }

  return (
    <Form
      className="p-4 border rounded"
      style={{ maxWidth: '400px', margin: '0 auto' }}
      onSubmit={handleSubmit}
    >
      <h2 className="text-center mb-4">Регистрация</h2>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Control name="name" type="name" placeholder="Введите имя" required />
        <Form.Text className="text-muted">Ваше имя</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control name="email" type="email" placeholder="Enter email" required />
        <Form.Text className="text-muted">
          Ваш email будет использоваться для входа в аккаунт.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          name="password"
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
        <Form.Control
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formSecretKey">
        <Form.Control
          name="secretKey"
          type="password"
          placeholder="Enter your secret key"
          required
          aria-describedby="secretKeyHelpBlock"
        />
        <Form.Text id="secretKeyHelpBlock" muted></Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="I agree to the Terms and Conditions"
          required
        />
      </Form.Group>

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
