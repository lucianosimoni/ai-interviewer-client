import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "./LoggedInUserContext";

export default function MockUser() {
  const { setLoggedInUser } = useContext(LoggedInUserContext);
  const navigateTo = useNavigate();

  const loginAsMockUser = () => {
    const body = {
      email: "test@email.com",
      password: "test",
    };

    const url = window.location.href;
    const apiUrl = url.includes("ai-interviewer")
      ? "https://ai-interviewer.onrender.com"
      : "http://localhost:3000";

    axios
      .post(apiUrl + "/user/login", body)
      .then((res) => {
        if (res.status !== 200) {
          localStorage.removeItem("loggedInUser");
          throw new Error(res);
        }
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(res.data.loggedInUser)
        );
        setLoggedInUser(res.data.loggedInUser);
        navigateTo("/dashboard");
      })
      .catch((error) => {
        const errorRes = error.response.data.error;
        return console.error({
          error: { message: errorRes.message ? errorRes.message : error },
        });
      });
  };
  loginAsMockUser();

  return (
    <main className="bg-white dark:bg-gray-900  h-screen flex flex-col items-center justify-center">
      <span className="text-gray-900 dark:text-white text-2xl animate-pulse">
        Logging in as a Test user...
      </span>

      <Link
        to={"/"}
        className="m-6 w-fit text-white bg-red-600 hover:bg-red-700 disabled:hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
      >
        Cancel
      </Link>
    </main>
  );
}
