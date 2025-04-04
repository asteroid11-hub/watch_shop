import Carousel from 'react-bootstrap/Carousel';

import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../../config/axiosInstance';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Button, Form } from 'react-bootstrap';
import marketingService from '../../services/MarketingService';
import FormCarousel from './FormCarousel';

function CarouselFadeExample({ isLoggedIn }) {
  const [marketings, setMarketing] = useState([]);
  const [isClickAdd, setClickAdd] = useState(false);
  const [isClickEdit, setClickEdit] = useState(false);
  const [isClickDelete, setClickDelete] = useState(false);
  const [editingMarketing, setEditingMarketing] = useState(null);

  useEffect(() => {
    marketingService.getAll().then((res) => setMarketing(res));
  }, []);

  // const newWatch = {
  //   model: 'Test model',
  //   description: 'Test description',
  //   image: 'https://w.wallhaven.cc/full/n6/wallhaven-n611e6.jpg',
  // };

  // console.log(watches)

  const handleDelete = async (id) => {
    setMarketing((prev) => prev.filter((el) => el.id !== id));
    await marketingService.delete(id);
  }

    return (
      <Carousel
        {...(!isClickEdit && { fade: true })}
        {...(!isClickAdd && { fade: true })}
        style={{
          height: '90vh',
          position: 'relative',
        }}
      >
        {marketings.map((marketing) => (
          <Carousel.Item key={marketing.id}>
            <div
              className="shadow-lg"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
              }}
            >
              <img src={`${marketing.image}`} style={{ height: '80vh' }} />
            </div>
            <Carousel.Caption>
              <h1>Точность — язык совершенства</h1>
              <h3>{marketing.model}</h3>
              <p>{marketing.description}</p>
            </Carousel.Caption>
            {(isClickAdd || isClickEdit) && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1002,
                  width: '80%',
                  maxWidth: '600px',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  padding: '20px',
                  borderRadius: '10px',
                  boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
                }}
              >
                <FormCarousel
                  marketings={marketings}
                  setMarketing={setMarketing}
                  setClickAdd={setClickAdd}
                  setClickEdit={setClickEdit}
                  editingMarketing={isClickEdit ? editingMarketing : null}
                />
              </div>
            )}
            {isLoggedIn && (
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '250px',
                  zIndex: '1001',
                  display: 'flex',
                  gap: '10px',
                }}
              >
                <Button
                  variant="light"
                  className="d-flex align-items-cente"
                  onClick={() => setClickAdd(true)}
                >
                  <i className="bi bi-plus-lg"></i>
                </Button>
                <Button
                  variant="light"
                  className="d-flex align-items-cente"
                  onClick={() => {
                    setEditingMarketing(marketing);
                    setClickEdit(true);
                  }}
                >
                  <i className="bi bi-pencil-square"></i>
                </Button>
                <Button
                  variant="light"
                  className="d-flex align-items-cente"
                  onClick={() =>{handleDelete(marketing.id); setClickDelete(true); } }
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </div>
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    );
  };

export default CarouselFadeExample;
