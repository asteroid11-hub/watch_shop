import React, { useState, useEffect } from 'react';
import { Carousel, Button, Card, Nav, ListGroup } from 'react-bootstrap';
import axiosInstance from '../../../config/axiosInstance';
import { Link, useNavigate } from 'react-router';
import styles from './AllWatchesCard.module.css';

export default function AllWatchesCard({ isLoggedIn }) {
  const [watches, setWatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get('/watch')
      .then((res) => setWatches(res.data))
      .catch((error) => console.error('Ошибка при загрузке данных:', error));
  }, []);

  const groupWatches = (watches) => {
    const grouped = [];
    for (let i = 0; i < watches.length; i += 4) {
      grouped.push(watches.slice(i, i + 4));
    }
    return grouped;
  };

  const deleteHandler = (e, watchId) => {
    e.preventDefault();
    axiosInstance
      .delete(`/watch/${watchId}`)
      .then((res) => {
        setWatches(watches.filter((watch) => watch.id !== watchId));
      })
      .catch((error) => {
        console.error('Ошибка при удалении данных:', error);
      });
  };

  const groupedWatches = groupWatches(watches);

  return (
    <Carousel data-bs-theme="dark" style={{ height: '20em' }}>
      {groupedWatches.map((group) => (
        <Carousel.Item key={group.id}>
          <div className="d-flex justify-content-around">
            {group.map((watch) => (
              <Card key={watch.id}
                style={{ width: '18rem', height: '20rem' }}
                className={styles.container}
              >
                <Card.Img variant="top" src={watch.image} />
                {isLoggedIn && (
                  <div className={styles.boxCRUD}>
                    <div
                      style={{
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
                        onClick={() => navigate('/addwatch')}
                      >
                        <i className="bi bi-plus-lg"></i>
                      </Button>
                      <Button
                        variant="light"
                        className="d-flex align-items-cente"
                        onClick={() => navigate('/editwatch')}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                      <Button
                        variant="light"
                        className="d-flex align-items-cente"
                        onClick={(e) => deleteHandler(e, watch.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </div>
                  </div>
                )}
                <Card.Body>
                  <Card.Title>{watch.model}</Card.Title>

                  <Card.Link
                    as={Link}
                    to={`watch/${watch.id}`}
                    style={{
                      color: 'green',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      marginRight: '10px',
                    }}
                    className="hover_link"
                  >
                    Подробнее
                  </Card.Link>
                  <Card.Link
                    href="#contact"
                    style={{
                      color: 'green',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      marginRight: '15px',
                    }}
                    className="hover-link"
                  >
                    Связаться с нами
                  </Card.Link>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
