
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
import { Cfg } from "../config";
import ProductGridPage from "../pages/product/ProductGridPage";
const routes = [
  
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
        element: Cfg.CategoryList.enabled ? <ProductCategroyGridPages /> : <ProductGridPage />,
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
        path: "login",
        element: <SignIn />,
    },
    {
        path: "/",
        element: Cfg.CategoryList.enabled ? <ProductCategroyGridPages /> : <ProductGridPage />,
    },
];

export const Router = createBrowserRouter(routes);
    