import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landingpage from './page/Landing/Landingpage';
import Loginpage from './page/Login/Loginpage';
import Homepage from './page/Home/Homepage';
import store from "./App/store"
import Registerpage from './page/Register/Registerpage';
import Tambahloker from './page/Tambahloker/Tambahloker';
import Contactpage from './page/Contact/Contactpage';
import Profilepage from './page/Profile/Profilepage';
import Logoutpage from './page/Logout/Logoutpage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/Landingpage",
    element: <Landingpage/>
  },
  {
    path: "/Loginpage",
    element: <Loginpage/>
  },
  {
    path: "/Homepage",
    element: <Homepage/>
  },
  {
    path: "/Registerpage",
    element: <Registerpage/>
  },
  {
    path: "/Tambahloker",
    element: <Tambahloker/>
  },
  {
    path: "/Contactpage",
    element: <Contactpage/>
  },
  {
    path: "/Profilepage",
    element: <Profilepage/>
  },
  {
    path: "/Logoutpage",
    element: <Logoutpage/>
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
