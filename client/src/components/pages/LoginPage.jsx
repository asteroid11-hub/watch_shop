import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function LoginForm({ loginHandler }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    await loginHandler(data);
  };

  return (
    <Form
      className="p-4 border rounded"
      onSubmit={handleSubmit}
      style={{ maxWidth: '400px', margin: '0 auto' }}
    >
      <h2 className="text-center mb-4">Login</h2>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control name="email" type="email" placeholder="Enter email" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          name="password"
          type="password"
          placeholder="Password"
          required
          aria-describedby="passwordHelpBlock"
        />
        <Form.Text id="passwordHelpBlock" muted></Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        Login
      </Button>

      <div className="text-center mt-3">
        <a href="/forgot-password">Восстановить пароль</a>
      </div>
    </Form>
  );
}

export default LoginForm;
