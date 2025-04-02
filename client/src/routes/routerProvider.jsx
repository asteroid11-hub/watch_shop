import { Route, Routes } from 'react-router';
import Layout from '../components/Layout';
import MainPage from '../components/pages/MainPage';

export default function RouterProvider() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />}></Route>
      </Route>
    </Routes>
  );
}
