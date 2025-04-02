import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

export default function Feedback() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <Card.Title as="h2" className="text-center mb-4">
                Связаться с нами
              </Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Введите ваш email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupName">
                  <Form.Label>Ф.И.О.</Form.Label>
                  <Form.Control type="email" placeholder="Введите ваше ФИО" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupMessage">
                  <Form.Label>Сообщение</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Введите ваше сообщение"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFile">
                  <Form.Label>Прикрепить файл</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
                <div className="text-center">
                  <Button variant="dark" className="w-40">
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
