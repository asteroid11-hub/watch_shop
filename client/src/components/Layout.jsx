import React from 'react';
import { Outlet } from 'react-router';
import NavBar from './ui/NavBar';

const Layout = ({ isLoggedIn, logoutHandler }) => {
  return (
    <div className="layout">
      <header>
        <NavBar isLoggedIn={isLoggedIn} logoutHandler={logoutHandler} />
      </header>
      <Outlet />

      <footer></footer>


    </div>
  );
};

export default Layout;
