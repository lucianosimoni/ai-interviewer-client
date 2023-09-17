import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoggedInUserContext } from "./LoggedInUserContext";

export default function Contact() {
  const [navCollapsed, SetNavCollapsed] = useState(true);
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);

  const handleNavCollapse = (event) => {
    SetNavCollapsed(!navCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <>
      <header className="fixed w-full">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            {/* LOGO */}
            <Link to={"/"} className="flex items-center">
              <img
                src="/logo192.png"
                className="mr-3 h-6 sm:h-9"
                alt="AI Interviewer Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                AI Interviewer
              </span>
            </Link>

            {/* RIGHT BUTTONS */}
            <div className="flex items-center lg:order-2">
              {/* DASHBOARD & LOGOUT BUTTONS */}
              {loggedInUser && (
                <>
                  <Link to={"/dashboard/"} className="hidden md:flex">
                    <button
                      type="button"
                      className="text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 py-3 px-4 lg:px-5 lg:py-2.5 text-sm font-medium text-center dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    >
                      Dashboard
                    </button>
                  </Link>

                  {/* LOG OUT */}
                  <button
                    type="button"
                    className="flex items-center justify-center ml-2 p-[7px] text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 rounded-lg dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                    onClick={handleLogout}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="28"
                      width="28"
                      viewBox="0 96 960 960"
                    >
                      <path
                        fill="currentColor"
                        d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h291v60H180v600h291v60H180Zm486-185-43-43 102-102H375v-60h348L621 444l43-43 176 176-174 174Z"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* LOGIN AND SIGNUP BUTTONS */}
              {!loggedInUser && (
                <>
                  {/* LOGIN */}
                  <Link to={"/login"} className="flex">
                    <button
                      type="button"
                      className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                    >
                      Log in
                    </button>
                  </Link>

                  {/* SIGNUP */}
                  <Link to={"/signup"} className="hidden md:flex">
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Sign up
                    </button>
                  </Link>
                </>
              )}

              {/* MOBILE BUTTON */}
              <button
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={handleNavCollapse}
              >
                <span className="sr-only">Open main menu</span>

                {navCollapsed ? (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </button>
            </div>

            {/* PAGES */}
            <div
              className={
                navCollapsed
                  ? "hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                  : "flex justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              }
            >
              <ul className="flex flex-col w-full text-right mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <Link
                    to={"/"}
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/about"}
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/team"}
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Team
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/contact"}
                    className="block py-2 pr-4 pl-3 text-white rounded bg-blue-700 lg:bg-transparent lg:text-blue-700 lg:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard"}
                    className="block lg:hidden py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main className="bg-white dark:bg-gray-900 h-screen flex">
        <section className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          {/* LEFT SIDE */}
          <div className="place-self-center lg:col-span-7">
            {/* TITLE */}
            <h1 className="text-center md:text-left max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Get in contact
            </h1>
            {/* DESCRIPTION */}
            <p className="text-center md:text-left max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              email:
              <a
                href="mailto:lucianosimonipersonal@gmail.com"
                className="font-bold before:content-['_']"
              >
                lucianoSimoniPersonal@gmail.com
              </a>{" "}
              <br />
              website:
              <a
                href="https://lucianosimoni.dev"
                target="_blank"
                className="font-bold before:content-['_']"
                rel="noreferrer"
              >
                www.lucianosimoni.dev
              </a>
            </p>

            {/* BUTTONS */}
            <div className="flex flex-row justify-center lg:justify-start">
              {/* SIGNUP / DASHBOARD */}
              {loggedInUser ? (
                <Link
                  to={"/dashboard"}
                  className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                >
                  Dashboard
                  <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              ) : (
                <Link to={"/signup"}>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                  >
                    Sign up
                    <svg
                      className="w-5 h-5 ml-2 -mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </Link>
              )}

              {/* LEARN MORE */}
              <Link
                to={"/about"}
                className="items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Learn more
              </Link>
            </div>
          </div>

          {/* IMAGE RIGHT */}
          <div className="hidden items-center h-full lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/database-b2684.appspot.com/o/ai-interviewer-home-image-second.png?alt=media&token=338df380-c9bc-4931-a3d7-788c497330a2"
              alt="mockup"
            />
          </div>
        </section>
      </main>
    </>
  );
}
