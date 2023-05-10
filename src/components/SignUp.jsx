import axios from "axios";
import { useContext, useState } from "react";
import ErrorPopup from "./ErrorPopup";
import LoadingSpinner from "./LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "./LoggedInUserContext";

export default function SignUp() {
  const { setLoggedInUser } = useContext(LoggedInUserContext);
  const [passwordsCorrect, setPasswordsCorrect] = useState(undefined);
  const [error, setError] = useState({ visible: false, message: "" });
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const [firstName, lastName, email, password] = event.target;

    setLoading(true);
    const body = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    };

    const url = window.location.href;
    const apiUrl = url.includes("ai-interviewer")
      ? "https://ai-interviewer.onrender.com"
      : "http://localhost:3000";

    // TODO: Use the Authentication.js
    axios
      .post(apiUrl + "/user/register", body)
      .then((res) => {
        setLoading(false);
        if (res.status !== 201) {
          console.error(res);
          localStorage.removeItem("loggedInUser");
          return setError({
            visible: true,
            message:
              "An error occured while trying to Register. Try again or get in touch with Luciano.",
          });
        }
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(res.data.createdUser)
        );
        setLoggedInUser(res.data.createdUser);
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

  const checkPasswords = () => {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    if (password.value !== confirmPassword.value) {
      setPasswordsCorrect(false);
      return (confirmPassword.className =
        "bg-gray-50 border border-red-600 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 outline-none focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-red-600 dark:placeholder-red-400 dark:text-red-400 dark:focus:ring-red-500 dark:focus:border-red-500");
    }
    confirmPassword.className =
      "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 outline-none focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    setPasswordsCorrect(true);
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

            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>

                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  {/* NAMES */}
                  <div className="flex gap-3">
                    <div className="w-full">
                      <label
                        htmlFor="firstName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Josh"
                        required
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Williams"
                        required
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
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

                  {/* PASSWORDS */}
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
                      onChange={checkPasswords}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      aria-invalid={passwordsCorrect ? false : true}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={checkPasswords}
                      required
                    />
                  </div>

                  {/* TERMS AND CONDITIONS */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms"
                        className="font-light text-gray-500 dark:text-gray-300"
                      >
                        I accept the{" "}
                        <Link
                          to={"/terms-and-conditions"}
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          Terms and Conditions
                        </Link>
                      </label>
                    </div>
                  </div>

                  {/* CREATE ACCOUNT BUTTON */}
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 disabled:hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Create an account
                  </button>

                  {/* LOGIN */}
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to={"/login"}
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Login here
                    </Link>
                  </p>
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
