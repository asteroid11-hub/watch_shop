import React, { useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import axiosInstance from '../../config/axiosInstance';
import marketingService from '../../services/MarketingService';
import { useNavigate } from 'react-router';

export default function FormCarousel({
  marketings,
  setMarketing,
  setClickAdd,
  setClickEdit,
  editingMarketing,
}) {
  const [modelInput, setModelInput] = useState(editingMarketing?.model || '');
  const [descriptionInput, setDescriptionInput] = useState(
    editingMarketing?.description || '',
  );

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      let response;
      if (editingMarketing) {
        // Режим редактирования
        response = await marketingService.update(editingMarketing.id, formData);
        console.log(response);

        setMarketing(
          marketings.map((item) => (item.id === editingMarketing.id ? response : item)),
        );
        setClickEdit(false);
      } else {
        // Режим добавления
        response = await marketingService.create(formData);
        setMarketing([...marketings, response]);
        setClickAdd(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const aiQuestionHandler = async () => {
    try {
      const res = await axiosInstance.post('/admin/aidescription', {
        prompt: `Мы компания уникальных дорогих часов, мне нужно сгенерировать для этой модели часов короткое описание до 100 символов ${modelInput} вот тебе уточняющий промпт ${descriptionInput} ответ текстом без маркдауна без лишних комментариев`,
      });
      console.log(res.data);

      setDescriptionInput(res.data.description);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <Form onSubmit={handlerSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Модель</Form.Label>
        <Form.Control
          as="textarea"
          name="model"
          // defaultValue={editingMarketing?.model || modelInput}
          value={modelInput}
          onChange={(e) => setModelInput(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Описание</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          // defaultValue={editingMarketing?.description || ''}
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFile">
        <Form.Label>Прикрепить файл</Form.Label>
        <Form.Control type="file" name="image" />
        {editingMarketing && (
          <small className="text-muted">
            Текущее изображение: {editingMarketing.image}
          </small>
        )}
      </Form.Group>

      <Stack direction="horizontal" gap={3}>
        <Button variant="dark" className="w-40 text-center p-2" type="submit">
          {editingMarketing ? 'Обновить' : 'Отправить'} 
        </Button>

        <Button
          variant="dark"
          className="w-40 text-center p-2 ms-auto"
          type="button"
          onClick={aiQuestionHandler}
        >
          Сгенерировать описание
        </Button>

        <Button
          variant="dark"
          className="w-40 text-center p-2 ms-auto"
          type="button"
          onClick={() => (editingMarketing ? setClickEdit(false) : setClickAdd(false))}
        >
          Закрыть
        </Button>
      </Stack>
    </Form>
  );
}
