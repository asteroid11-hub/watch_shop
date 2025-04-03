import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axiosinstance from '../../../config/axiosInstance';

export default function AddNewWatch() {
  const addSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const form = new FormData(e.target);
      const formData = Object.fromEntries(form);
      const res = axiosinstance.post('/watch/', formData);
      console.log('Данные успешно добавлены!', res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <Card.Title as="h2" className="text-center mb-4">
                Форма добавления часов
              </Card.Title>

              <Form onSubmit={addSubmitHandler}>
                <Form.Group className="mb-3" controlId="model">
                  <Form.Label>Модель</Form.Label>
                  <Form.Control
                    type="text"
                    name="model"
                    placeholder="Введите модель часы"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Описание</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    rows={3}
                    placeholder="Введите описание"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formFile">
                  <Form.Label>Прикрепить файл</Form.Label>
                  <Form.Control type="file" name="name_of_file_input" />
                </Form.Group>

                <div className="text-center">
                  <Button variant="dark" className="w-40" type="submit">
                    Добавить
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
