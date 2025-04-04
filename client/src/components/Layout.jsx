import { Outlet } from 'react-router';
import NavBar from './ui/NavBar';
import Footer from './ui/Footer';

const Layout = ({ isLoggedIn, logoutHandler}) => {
  return (
    <div className="layout">
      <header>
        <NavBar isLoggedIn={isLoggedIn} logoutHandler={logoutHandler} />
      </header>
      <main
        style={{
          paddingTop: '20px',
          paddingBottom: '20px',
          backgroundColor: 'black',
          minHeight: '80vh',
        }}
      >
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
