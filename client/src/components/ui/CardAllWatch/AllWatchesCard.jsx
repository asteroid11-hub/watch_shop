import React, { useState, useEffect } from 'react';
import { Carousel, Button, Card, Nav, ListGroup } from 'react-bootstrap';
import axiosInstance from '../../../config/axiosInstance';
import { Link } from 'react-router';

export default function AllWatchesCard() {
  const [watches, setWatches] = useState([]);

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

  const groupedWatches = groupWatches(watches);

  return (
    <Carousel data-bs-theme="dark" style={{ height: '28em' }}>
      {groupedWatches.map((group, index) => (
        <Carousel.Item key={index}>
          <div className="d-flex justify-content-around">
            {group.map((watch) => (
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={watch.image} />

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
