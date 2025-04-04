import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

export default function Feedback({ feedbackHandler }) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, file: e.target.files[0] }); 
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    feedbackHandler(formData);
    setFormData({ email: '', name: '', message: '', file: null }); 
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <Card.Title as="h2" className="text-center mb-4">
                Связаться с нами
              </Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Введите ваш email"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupName">
                  <Form.Label>Ф.И.О.</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Введите ваше ФИО"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupMessage">
                  <Form.Label>Сообщение</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Введите ваше сообщение"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFile">
                  <Form.Label>Прикрепить файл</Form.Label>
                  <Form.Control
                    type="file"
                    name="file"
                    onChange={handleChange} 
                  />
                </Form.Group>
                <div className="text-center">
                  <Button variant="dark" type="submit" className="w-40">
                    Отправить
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
