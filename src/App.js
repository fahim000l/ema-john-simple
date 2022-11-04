import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Abouts from './components/Abouts/Abouts';
import Inventory from './components/Inventory/Inventory';
import LogIn from './components/LogIn/LogIn';
import Orders from './components/Orders/Orders';
import { Products, ShoppingCart, Product } from './components/Products/Products';
import Register from './components/Register/Register';
import Shipping from './components/Shipping/Shipping';
import Main from './Layout/Main';
import { ProductsAndCartLoader } from './Loaders/ProductsAndCartLoader';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/Shop',
          element: <Products></Products>,
        },
        {
          path: '/OrderReview',
          element: <Orders></Orders>,
          loader: ProductsAndCartLoader
        },
        {
          path: '/ManageInventory',
          element: <PrivateRoute><Inventory></Inventory></PrivateRoute>
        },
        {
          path: '/Shipping',
          element: <PrivateRoute><Shipping></Shipping></PrivateRoute>
        },
        {
          path: '/LogIn',
          element: <LogIn></LogIn>
        },
        {
          path: '/Register',
          element: <Register></Register>
        }
      ]
    },
    {
      path: '/Abouts',
      element: <Abouts></Abouts>
    }
  ]);
  return (

    <div className="App">
      <RouterProvider router={router}></RouterProvider>

    </div>
  );
}

export default App;
