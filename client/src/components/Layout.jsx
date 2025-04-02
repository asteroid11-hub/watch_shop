import React from 'react';
import { Outlet } from 'react-router';
import NavBar from './ui/NavBar'

const Layout = () => {
  return (
    <div className="layout">
      <header>
       <NavBar/>
      </header>
      <Outlet />
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default Layout;
