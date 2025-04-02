import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function About() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="text-center shadow-lg border-0">
            <Card.Body>
              <Card.Title as="h2" className="mb-3">
                О нас
              </Card.Title>
              <Card.Text>
                <strong>Время – это искусство.</strong> Мы – команда мастеров, для которых
                создание часов не просто ремесло, а настоящее искусство. Каждая наша
                модель – это сочетание традиционного мастерства, современных технологий и
                смелых дизайнерских решений.
              </Card.Text>
              <Card.Text>
                Наши часы создаются вручную, с особым вниманием к деталям. Мы используем
                только премиальные материалы: благородные металлы, натуральную кожу,
                сапфировое стекло и эксклюзивные механизмы.
              </Card.Text>
              <Card.Text>
                Каждый экземпляр – уникален, как и его владелец. Мы не просто создаем часы
                – мы создаем историю, которая будет идти с вами{' '}
                <strong>в ногу со временем.</strong>
              </Card.Text>
              <Card.Text as="h3" className="fw-bold">
                Ваше время. Ваш стиль. Ваша история.
              </Card.Text>
              <Button variant="dark" className="d-flex align-items-center">
                <i className="bi bi-pencil-square me-2"></i>
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
