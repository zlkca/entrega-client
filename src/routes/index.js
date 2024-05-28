
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import SignIn from "../pages/auth/SignIn";
import ProductDetails from "../pages/product/ProductDetails";
import ProductCategroyGridPages from "../pages/product/ProductCategoryGridPage";
import CartFormPage from "../pages/cart/CartForm";

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
                        element: <ProductCategroyGridPages />,
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
                
                    {
                        path: "cart",
                        element: <CartFormPage />,
                    },
                
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
    