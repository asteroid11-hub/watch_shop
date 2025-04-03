import React, { useState, useEffect } from 'react';
import { Carousel, Button, Card } from 'react-bootstrap';
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
              <Card key={watch.id} style={{ width: '15rem', height: '25em' }}>
                <Card.Img variant="top" src={watch.image} style={{ height: '15em' }} />
                <Card.Body>
                  <Card.Title>{watch.model}</Card.Title>
                  <Card.Text>
                    <Link to={`watch/${watch.id}`}>Подробнее</Link>
                  </Card.Text>
                  <Card.Text>Связаться</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
