import React from 'react';
import { Button, Form } from 'react-bootstrap';
import axiosInstance from '../../config/axiosInstance';
import watchService from '../../services/WatchService'
import { useNavigate } from 'react-router';

export default function FormCarousel() {
  const navigate = useNavigate();

  const handlerAdd = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
      await watchService.createWatch(data);
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }

    // const res = await axiosInstance.post(`/watch`, newWatch);
    // console.log(res);
    // setWatch([...watches, res.data]);
    // setClickAdd(true);
  };

  return (
    <Form onSubmit={handlerAdd}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Model</Form.Label>
        <Form.Control as="textarea" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} />
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
  );
}
