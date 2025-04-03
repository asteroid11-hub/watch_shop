import React from 'react';
import CarouselFadeExample from '../ui/Carousel';
import About from '../ui/About';
import Feedback from '../ui/Feedback';

export default function MainPage({isLoggedIn,logoutHandler}) {
  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
      <CarouselFadeExample isLoggedIn={isLoggedIn}/>
      <div id="about">
        <About />
      </div>
      <div id="contact">
        <Feedback />
      </div>
    </div>
  );
}

