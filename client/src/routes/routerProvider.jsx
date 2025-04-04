import { Link, Navigate, Route, Routes, useNavigate } from 'react-router';
import Layout from '../components/Layout';
import MainPage from '../components/pages/MainPage';
import LoginPage from '../components/pages/LoginPage';
import RegistrationPage from '../components/pages/RegistrationPage';
import AddNewWatch from '../components/ui/CardAddNewWatch/AddNewWatch';
import { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosInstance';
import CardPage from '../components/pages/CardPage';
import AdminPage from '../components/pages/AdminPage';

export default function RouterProvider() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const navigate = useNavigate();

  const signupHandler = async (formData) => {
    const res = await axiosInstance.post('/auth/register', formData);
    if (res.status === 200) setUser(res.data.user);
    setIsLoggedIn(true);
    // navigate('/admin');
    console.log(res.data.user);
  };
  const loginHandler = async (formData) => {
    const res = await axiosInstance.post('/auth/login', formData);
    if (res.status === 200) setUser(res.data.user);
    setIsLoggedIn(true);
    // navigate('/admin');
    console.log(res.data.user);
    console.log(user);
  };
  const logoutHandler = async () => {
    await axiosInstance.delete('/auth/logout');
    setUser(null);
    setIsLoggedIn(false);
    // navigate('/');
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
  }, []);

  return (
    <Routes>
      <Route element={<Layout isLoggedIn={isLoggedIn} logoutHandler={logoutHandler} />}>
        {/* Главная страница - отдельный маршрут */}
        <Route
          path="/"
          element={<MainPage isLoggedIn={isLoggedIn} feedbackHandler={feedbackHandler} />}
        />

        {/* Остальные маршруты */}
        <Route path="/watch/:id" element={<CardPage />} />
        <Route path="/addwatch" element={<AddNewWatch />} />
        <Route path="*" element={<Navigate to="/" />} />

        {/* Авторизация */}
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
          element={
            isLoggedIn ? (
              <Navigate to="/admin" />
            ) : (
              <RegistrationPage signupHandler={signupHandler} />
            )
          }
        />

        {/* Админка */}
        <Route
          path="/admin"
          element={
            isLoggedIn ? (
              <AdminPage user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Route>
    </Routes>
  );
}
