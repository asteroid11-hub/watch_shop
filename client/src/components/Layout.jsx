import React from 'react';
import { Outlet } from 'react-router';
import NavBar from './ui/NavBar';

const Layout = ({ isLoggedIn, logoutHandler, user }) => {
  return (
    <div className="layout">
      <header>
        <NavBar isLoggedIn={isLoggedIn} logoutHandler={logoutHandler} user={user} />
      </header>
      <Outlet />

      <footer></footer>


    </div>
  );
};

export default Layout;
