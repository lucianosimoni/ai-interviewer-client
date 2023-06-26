import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import SignUp from "./components/SignUp";
import TermsAndConditions from "./components/TermsAndConditions";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NewInterview from "./components/dashboard/NewInterview";
import Overview from "./components/dashboard/Overview";
import Help from "./components/dashboard/Help";
import Interview from "./components/interview/Interview";
import MockUser from "./components/MockUser";
import About from "./components/About";
import Team from "./components/Team";
import Contact from "./components/Contact";
import { LoggedInUserContext } from "./components/LoggedInUserContext";

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
    element: <Interview />,
  },
  {
    path: "/dashboard/",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/overview",
        element: <Overview />,
      },
      {
        path: "/dashboard/new-interview",
        element: <NewInterview />,
      },
      {
        path: "/dashboard/help",
        element: <Help />,
      },
    ],
  },
  { path: "/about", element: <About /> },
  { path: "/team", element: <Team /> },
  { path: "/contact", element: <Contact /> },
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditions />,
  },
  {
    path: "/mock-user",
    element: <MockUser />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  const [loggedInUser, setLoggedInUser] = React.useState(null);

  React.useEffect(() => {
    const loggedInUserLocal = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUserLocal) {
      setLoggedInUser(loggedInUserLocal);
    }
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      <RouterProvider router={router} />
    </LoggedInUserContext.Provider>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
