import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from './views/Signup/Signup';
import Login from './views/Login/Login';
import MyOrders from './views/MyOrders/MyOrders';
import BuyPage from './views/BuyPage/BuyPage';
import Home from './views/Home/Home';

const router = createBrowserRouter([{
  path: '/',
  element:<Home/>
},
{
  path: '/signup',
  element: <Signup />
},
{
  path: '/login',
  element: <Login/>
},
{
  path: '/orders',
  element: <MyOrders/>
},
{
  path: '/buy/:id',
  element :<BuyPage/> 
}

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);



