import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Layout from './layout/Layout.jsx';
import MainPage from './pages/MainPage.jsx';
import ListStudents from './pages/students/ListStudents.jsx'
import FormStudents from './pages/students/FormStudents.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: '/students',
        element: <ListStudents/>
      },
      {
        path: '/students/form',
        element: <FormStudents />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={ router } />
  </StrictMode>,
);
