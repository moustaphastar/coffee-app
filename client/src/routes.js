import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Product from './pages/ProductList';
import NotFound from './pages/NotFound';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'products', element: <Product /> },
      { path: 'hot', element: <Product category="hot" /> },
      { path: 'iced', element: <Product category="iced" /> },
      { path: 'search', element: <Product searchText="" /> },
      { path: '*', element: <Navigate to="/404" /> },
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/products" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
