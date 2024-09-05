import * as React from "react";
import { createBrowserRouter } from "react-router-dom";

import SignIn from "../pages/auth/SignIn";
import Home from "../pages/Home";
import GoalListPage from "../pages/goal/GoalList";
import GoalFormPage from "../pages/goal/GoalForm";
import TaskListPage from "../pages/task/TaskList";
import TaskFormPage from "../pages/task/TaskForm";
import CategoryListPage from "../pages/category/CategoryList";
import AnalyticsPage from "../pages/analytics";

export const Router = createBrowserRouter([
  {
    path: "/goals",
    element: <GoalListPage />,
  },

  {
    path: "/goals/:id/form",
    element: <GoalFormPage />,
  },

  {
    path: "/tasks",
    element: <TaskListPage />,
  },
  {
    path: "/tasks/:id/form",
    element: <TaskFormPage />,
  },
  {
    path: "/categories",
    element: <CategoryListPage />,
  },
  // {
  //   path: "/categories/:categoryId/goals",
  //   element: <GoalListPage />,
  // },
  {
    path: "/analytics",
    element: <AnalyticsPage />,
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
