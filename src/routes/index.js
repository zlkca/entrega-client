
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
import Home from "../pages/Home";
import GoalListPage from "../pages/goal/GoalList";
import GoalFormPage from "../pages/goal/GoalForm";
import TaskListPage from "../pages/task/TaskList";
import TaskFormPage from "../pages/task/TaskForm";

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
                
                    {
                        path: "goals",
                        element: <GoalListPage />,
                    },
                
                    {
                        path: "goals/:id/form",
                        element: <GoalFormPage />,
                    },
                
                    {
                        path: "tasks",
                        element: <TaskListPage />,
                    },
                
                    {
                        path: "tasks/:id/form",
                        element: <TaskFormPage />,
                    },
                    {
                        path: "/signin",
                        element: <SignIn />,
                    },
                    {
                        path: "/",
                        element: <Home />,
                    },
]);
    