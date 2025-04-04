import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axiosinstance from '../../../config/axiosInstance';
import styles from './EditWatch.module.css';
import { Link, useParams, useNavigate } from 'react-router';

export default function EditWatch() {
  const [watch, setWatch] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosinstance
      .get(`/watch/${id}`)
      .then((res) => {
        setWatch(res.data);
        setImagePreview(res.data.image); // Устанавливаем превью текущего изображения
      })
      .catch((error) => console.error('Ошибка при загрузке данных:', error));
  }, [id]);

  const editHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    formData.append('model', watch.model);
    formData.append('description', watch.description);

    axiosinstance
      .put(`/watch/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log('Успешно обновлено:', res.data);
        navigate('/'); // Перенаправляем после успешного обновления
      })
      .catch((error) => {
        console.error('Ошибка при редактировании данных:', error);
        alert('Ошибка при обновлении данных');
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWatch((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setWatch((prev) => ({ ...prev, image: file }));
      // Создаем превью для нового изображения
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <Card.Title as="h2" className="text-center mb-4">
                Форма изменения часов
              </Card.Title>

              {/* Превью изображения */}
              {imagePreview && (
                <div className="text-center mb-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                  />
                </div>
              )}

              <Form onSubmit={editHandler}>
                <Form.Group className="mb-3" controlId="model">
                  <Form.Label>Модель</Form.Label>
                  <Form.Control
                    type="text"
                    name="model"
                    value={watch.model || ''}
                    onChange={handleInputChange}
                    placeholder="Введите модель часов"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Описание</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={watch.description || ''}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Введите описание"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formFile">
                  <Form.Label>Изменить изображение</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </Form.Group>

                <div className={styles.box}>
                  <div className="text-center" style={{ display: 'flex', gap: '10px' }}>
                    <Button variant="dark" type="submit">
                      Сохранить изменения
                    </Button>
                    <Link to="/">
                      <Button variant="outline-dark">Закрыть</Button>
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
