import React from 'react';
import CarouselFadeExample from '../ui/Carousel';
import About from '../ui/About';
import Feedback from '../ui/Feedback';

export default function MainPage() {
  return (
    <div style={{ backgroundColor: 'black', height: '100vh' }}>
      <CarouselFadeExample />;
      <About />
      <Feedback />
    </div>
  );
}
