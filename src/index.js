import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TestScene from "./Test";
import ErrorPage from "./ErrorPage";
import SignUp from "./SignUp";
import TermsAndConditions from "./TermsAndConditions";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Interview from "./dashboard/Interview";
import Overview from "./dashboard/Overview";
import Help from "./dashboard/Help";

const loggedInUser = {
  firstName: "Luciano",
  lastName: "Simoni",
  email: "lucianoSimoni@gmail.com",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  { path: "/login", element: <Login /> },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard/",
    element: <Dashboard loggedInUser={loggedInUser} />,
    children: [
      {
        path: "/dashboard/overview",
        element: <Overview loggedInUser={loggedInUser} />,
      },
      {
        path: "/dashboard/interview",
        element: <Interview />,
      },
      {
        path: "/dashboard/help",
        element: <Help />,
      },
    ],
  },
  {
    path: "/test",
    element: <TestScene />,
  },
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditions />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
