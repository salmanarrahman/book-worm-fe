import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Products from '@/pages/Book';
import Signup from '@/pages/Signup';
import ProductDetails from '@/pages/ProductDetails';
import Book from '@/pages/Book';
import Add from '@/pages/Add';
import PrivateRoute from './PrivateRoute';
import { Edit } from 'lucide-react';
import EditBook from '@/pages/Edit';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/book',
        element: <Book />,
      },
      {
        path: '/product-details/:id',
        element: <PrivateRoute><ProductDetails /></PrivateRoute>,
      },
     
      {
        path: '/add',
        element: <PrivateRoute><Add /></PrivateRoute>,
      },
      {
        path: '/edit/:id',
        element: <PrivateRoute><EditBook /></PrivateRoute>,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
