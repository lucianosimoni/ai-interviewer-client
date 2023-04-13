import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ErrorPopup from "./ErrorPopup";
import LoadingSpinner from "./LoadingSpinner";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState({ visible: false, message: "" });
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const [email, password] = event.target;

    setLoading(true);
    const body = {
      email: email.value,
      password: password.value,
    };

    const url = window.location.href;
    const apiUrl = url.includes("ai-interviewer")
      ? "https://ai-interviewer.onrender.com"
      : "http://192.168.1.251:3000";

    axios
      .post(apiUrl + "/user/login", body)
      .then((res) => {
        setLoading(false);
        if (res.status !== 200) {
          console.error(res);
          localStorage.removeItem("loggedInUser");
          return setError({
            visible: true,
            message:
              "An error occured while trying to Login. Try again or get in touch with Luciano.",
          });
        }
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(res.data.loggedInUser)
        );
        navigateTo("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        const errorRes = error.response.data.error;
        return setError({
          visible: true,
          message: errorRes.message ? errorRes.message : error,
        });
      });
  };

  return (
    <>
      {loading ? <LoadingSpinner /> : null}
      {error.visible ? <ErrorPopup error={error} setError={setError} /> : null}

      <main className="bg-gray-50 dark:bg-gray-900">
        <div className="h-screen overflow-auto">
          <div className="bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            {/* LOGO */}
            <Link
              to={"/"}
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img className="w-8 h-8 mr-2" src="logo192.png" alt="logo" />
              AI Interviewer
            </Link>

            {/* MAIN AREA */}
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                {/* TITLE */}
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>

                {/* FORM */}
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* BUTTON */}
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Sign in
                  </button>

                  {/* NO ACCOUNT */}
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don't have an account yet?{" "}
                    <Link
                      to={"/signup"}
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Sign up
                    </Link>
                  </p>

                  {/* TODO: ⚠️ FORGOT PASSWORD
                      <a
                        href="#"
                        className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Forgot password?
                      </a> */}
                </form>
              </div>
            </div>

            {/* MOCK USER LOGIN */}
            <Link
              to={"/mock-user"}
              className="mt-6 w-fit text-white bg-yellow-600 hover:bg-yellow-700 disabled:hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
            >
              Login with Mock User
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
