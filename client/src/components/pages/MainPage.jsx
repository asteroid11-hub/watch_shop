import React from 'react';
import CarouselFadeExample from '../ui/Carousel';
import About from '../ui/About';
import Feedback from '../ui/Feedback';
import WatchScene from '../ui/animation';

export default function MainPage({isLoggedIn,logoutHandler, feedbackHandler}) {

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
      <CarouselFadeExample isLoggedIn={isLoggedIn}/>
      <div id="about">
        <About />
      </div>
      <div id="contact">
        <Feedback feedbackHandler={feedbackHandler} />
      </div>
    </div>
  );
}
