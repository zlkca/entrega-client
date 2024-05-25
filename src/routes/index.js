
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import SignIn from "../pages/auth/SignIn";
import ProductListPage from "../pages/product/ProductList";
import ProductDetails from "../pages/product/ProductDetails";

export const Router = createBrowserRouter([
  
                    // {
                    //     path: "accounts",
                    //     element: <AccountList />,
                    // },
                
                    // {
                    //     path: "accounts/:id/form",
                    //     element: <AccountForm />,
                    // },
                
                    {
                        path: "products",
                        element: <ProductListPage />,
                    },
                
                    {
                        path: "products/:id",
                        element: <ProductDetails />,
                    },
                
                    // {
                    //     path: "categories",
                    //     element: <CategoryList />,
                    // },
                
                    // {
                    //     path: "carts",
                    //     element: <CartList />,
                    // },
                
                    // {
                    //     path: "carts/:id/form",
                    //     element: <CartForm />,
                    // },
                
                    // {
                    //     path: "orders",
                    //     element: <OrderList />,
                    // },
                
                    // {
                    //     path: "orders/:id/form",
                    //     element: <OrderForm />,
                    // },
                    {
                        path: "/",
                        element: <SignIn />,
                    },
]);
    