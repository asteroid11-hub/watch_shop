import Carousel from 'react-bootstrap/Carousel';

import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../../config/axiosInstance';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

function CarouselFadeExample() {
  const [watches, setWatch] = useState([]);

  useEffect(() => {
    axiosInstance('/watch')
      .then((res) => setWatch(res.data));
  }, []);

  console.log(watches);

  return (
    <Carousel
      fade
      style={{
        height: '90vh',
      }}
    >
      {watches.map((watch) => (
        <Carousel.Item key={watch.id}>
          <Link to={`/watch/${watch.id}`}>
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
            <img src={watch.image} style={{ height: '80vh' }} />
          </div>
          <Carousel.Caption>
            <h1>Точность — язык совершенства</h1>
            <h3>{watch.model}</h3>
            <p>{watch.description}</p>
          </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselFadeExample;
