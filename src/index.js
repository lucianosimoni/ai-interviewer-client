import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./Home";
import ErrorPage from "./ErrorPage";
import SignUp from "./SignUp";
import TermsAndConditions from "./TermsAndConditions";
import Login from "./Login";
import Dashboard from "./Dashboard";
import NewInterview from "./dashboard/NewInterview";
import Overview from "./dashboard/Overview";
import Help from "./dashboard/Help";
import Interview from "./interview/Interview";
import MockUser from "./MockUser";
import { LoggedInUserContext } from "./LoggedInUserContext";

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
