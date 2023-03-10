import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import SignUp from "./SignUp";
import TermsAndConditions from "./TermsAndConditions";
import Login from "./Login";
import Dashboard from "./Dashboard";
import NewInterview from "./dashboard/NewInterview";
import Overview from "./dashboard/Overview";
import Help from "./dashboard/Help";
import Interview from "./interview/Interview";

const loggedInUser = {
  id: 1,
  firstName: "Luciano",
  lastName: "Simoni",
  email: "lucianosimonipersonal@gmail.com",
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
    path: "/interview/:interviewId",
    element: <Interview loggedInUser={loggedInUser} />,
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
        path: "/dashboard/new-interview",
        element: <NewInterview loggedInUser={loggedInUser} />,
      },
      {
        path: "/dashboard/help",
        element: <Help />,
      },
    ],
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
