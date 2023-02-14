import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import Issue from './pages/Issue';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/issues/:owner/:repo',
    element: <Issue />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
