import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {store} from "./store/store.ts";
import NewProduct from "./pages/NewProduct.tsx";
import EditProduct from "./pages/EditProduct.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/create",
        element: <NewProduct/>,
    },
    {
        path: "/edit/:productId",
        element: <EditProduct/>,
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>,
)
