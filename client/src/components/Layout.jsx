import React from 'react';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div className="layout">
      <header>
        <h1>Header</h1>
      </header>
      <Outlet />
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default Layout;
