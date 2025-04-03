import { Link, Navigate, Route, Routes } from 'react-router';
import Layout from '../components/Layout';
import MainPage from '../components/pages/MainPage';
import LoginPage from '../components/pages/LoginPage';
import RegistrationPage from '../components/pages/RegistrationPage';
import { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosInstance';
import CardPage from '../components/pages/CardPage';
import AdminPage from '../components/pages/AdminPage';

export default function RouterProvider() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  const signupHandler = async (formData) => {
    const res = await axiosInstance.post('/auth/register', formData);
    if (res.status === 200) setUser(res.data.user);
    console.log(res.data.user);
  };
  const loginHandler = async (formData) => {
    const res = await axiosInstance.post('/auth/login', formData);
    if (res.status === 200) setUser(res.data.user);
    console.log(res.data.user);
    console.log(user);
  };
  const logoutHandler = async () => {
    await axiosInstance.delete('/auth/logout');
    setUser(null);
  };

  const feedbackHandler = async (formData) => {
    const data = new FormData();
    data.append('email', formData.email);
    data.append('name', formData.name);
    data.append('message', formData.message);
    if (formData.file) {
      data.append('file', formData.file);
    }

    try {
      const response = await axiosInstance.post('/feedback', data);
      if (response.status === 200) {
        alert('Форма успешно отправлена!');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка при отправке формы');
    }
  };

  useEffect(() => {
    axiosInstance('/auth/refresh')
      .then((res) => setUser(res.data.user))
      .finally(() => setIsLoggedIn(true))
      .catch((error) => {
        setUser(null);
        setIsLoggedIn(false);
        console.log(error.message);
      });
    console.log(user);
    console.log(isLoggedIn);
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage feedbackHandler={feedbackHandler} />}></Route>
        <Route path="/:id" element={<CardPage />}></Route>
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/admin" />
            ) : (
              <LoginPage loginHandler={loginHandler} />
            )
          }
        />
        <Route
          path="/register"
          element={<RegistrationPage signupHandler={signupHandler} />}
        />
        <Route
          path="/admin"
          element={isLoggedIn ? <AdminPage /> : <Navigate to="/login" />}
        ></Route>
      </Route>
    </Routes>
  );
}
