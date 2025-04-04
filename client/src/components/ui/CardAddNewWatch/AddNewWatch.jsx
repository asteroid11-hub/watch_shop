import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axiosinstance from '../../../config/axiosInstance';
import styles from './AddNewWatch.module.css';
import { Link } from 'react-router';

export default function AddNewWatch() {
  const addSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const res = await axiosinstance.post('/watch', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Данные успешно добавлены!', res.data);
    } catch (error) {
      console.error('Ошибка при добавлении данных:', error);
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
                  <Form.Control type="file" name="file" />
                </Form.Group>

                <div className={styles.box}>
                  <div
                    className="text-center"
                    style={{ display: 'flex', marginRight: '20px' }}
                  >
                    <Button variant="dark" className="w-40" type="submit">
                      Добавить
                    </Button>
                  </div>
                  <div className="text-center">
                    <Link to="/">
                      <Button variant="dark" className="w-40" type="submit">
                        Закрыть
                      </Button>
                    </Link>
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
