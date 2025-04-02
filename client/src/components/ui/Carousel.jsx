import Carousel from 'react-bootstrap/Carousel';

import 'bootstrap/dist/css/bootstrap.min.css';

function CarouselFadeExample() {
  const watchArr = [
    {
      id: 1,
      model: 'Frederique Constant FC-220MPBD1S26B',
      description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
      image:
        'https://w.wallhaven.cc/full/nm/wallhaven-nm66rk.jpg',
    },
    {
      id: 2,
      model: 'Breitling UB2010161C1S1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image:
        'https://w.wallhaven.cc/full/n6/wallhaven-n611e6.jpg',
    },
  ];

  return (
    <Carousel
      fade
      style={{
        height: '90vh',
      }}
    >
      {watchArr.map((watch) => (
        <Carousel.Item key={watch.id}>
          <div className="shadow-lg"
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
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselFadeExample;
