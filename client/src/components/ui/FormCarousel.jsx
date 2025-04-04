import React from 'react';
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

return (
  <Form onSubmit={handlerSubmit}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <Form.Label>Модель</Form.Label>
      <Form.Control 
        as="textarea" 
        name="model" 
        defaultValue={editingMarketing?.model || ''}
      />
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <Form.Label>Описание</Form.Label>
      <Form.Control 
        as="textarea" 
        rows={3} 
        name="description" 
        defaultValue={editingMarketing?.description || ''}
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
        onClick={() => editingMarketing ? setClickEdit(false) : setClickAdd(false)}
      >
        Закрыть
      </Button>
    </Stack>
  </Form>
);
}
