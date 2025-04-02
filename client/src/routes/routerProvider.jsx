import { Route, Routes } from 'react-router';
import Layout from '../components/Layout';
import MainPage from '../components/pages/MainPage';
import LoginPage from '../components/pages/LoginPage';
import RegistrationPage from '../components/pages/RegistrationPage';
import { useState } from 'react';
import axiosInstance from '../config/axiosInstance';

export default function RouterProvider() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signupHandler = async (formData) => {
    const res = await axiosInstance.post('/auth/register', formData);
    if (res.status === 200) setUser(res.data.user);
  };
  const loginHandler = async (formData) => {
    const res = await axiosInstance.post('/auth/login', formData);
    if (res.status === 200) setUser(res.data.user);
  };
  const logoutHandler = async () => {
    await axiosInstance.delete('/auth/logout');
    setUser(null);
  };

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/login" element={<LoginPage loginHandler={loginHandler} />} />
        <Route
          path="/register"
          element={<RegistrationPage signupHandler={signupHandler} />}
        />
      </Route>
    </Routes>
  );
}
