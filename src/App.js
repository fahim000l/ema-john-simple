import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Abouts from './components/Abouts/Abouts';
import Inventory from './components/Inventory/Inventory';
import Orders from './components/Orders/Orders';
import { Products, ShoppingCart, Product } from './components/Products/Products';
import Main from './Layout/Main';
import { ProductsAndCartLoader } from './Loaders/ProductsAndCartLoader';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/Shop',
          element: <Products></Products>,
          loader: () => fetch('products.json'),
        },
        {
          path: '/OrderReview',
          element: <Orders></Orders>,
          loader: ProductsAndCartLoader
        },
        {
          path: '/ManageInventory',
          element: <Inventory></Inventory>
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
