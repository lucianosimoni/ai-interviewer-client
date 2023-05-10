import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "./LoggedInUserContext";
import Authentication from "../utils/Authentication";

export default function MockUser() {
  const { setLoggedInUser } = useContext(LoggedInUserContext);
  const navigateTo = useNavigate();

  useEffect(() => {
    const body = {
      email: "test@email.com",
      password: "test",
    };

    async function login() {
      const loggedInUser = await Authentication.login(body);
      setLoggedInUser(loggedInUser);
      navigateTo("/dashboard");
    }

    login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="bg-white dark:bg-gray-900  h-screen flex flex-col items-center justify-center">
      <span className="text-gray-900 dark:text-white text-2xl animate-pulse">
        Logging in as a Test user...
      </span>
      <span className="px-4 mt-8 font-bold text-center text-gray-900 dark:text-white transition-all duration-1000">
        The server scales down. Usually it takes up to 30 seconds to scale up
        and do it's job. 🙂
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
