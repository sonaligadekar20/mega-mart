import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from './views/Signup/Signup';
import Login from './views/Login/Login';

const router = createBrowserRouter([
{
  path: '/signup',
  element: <Signup />
},
{
  path: '/login',
  element: <Login/>
}

])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);



