import { Link, useOutlet } from "react-router-dom";
import Intro from "./dashboard/Intro";

export default function Dashboard({ loggedInUser }) {
  const outlet = useOutlet();
  return (
    <div className="h-screen w-full flex flex-auto">
      <aside className="fixed w-64 h-full" aria-label="Sidenav">
        {/* LOGO */}
        <div className="py-5 px-3 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <Link to={"/dashboard/"}>
            <button type="button" className="flex place-content-center">
              <img
                src="./logo192.png"
                className="mr-3 h-6 sm:h-9"
                alt="AI Interviewer Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                AI Interviewer
              </span>
            </button>
          </Link>
        </div>

        {/* Top Options */}
        <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          {/* First Section */}
          <ul className="space-y-2">
            {/* Overview */}
            <li>
              <Link to={"/dashboard/overview"}>
                <button
                  type="button"
                  className="w-full flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">Overview</span>
                </button>
              </Link>
            </li>

            {/* New interview */}
            <li>
              <Link to={"/dashboard/interview"}>
                <button
                  type="button"
                  className="w-full flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    stroke="currentColor"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>

                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    New interview
                  </span>
                </button>
              </Link>
            </li>
          </ul>

          {/* Second Section */}
          <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
            {/* HELP */}
            <li>
              <Link to={"/dashboard/help"}>
                <button
                  type="button"
                  className="w-full flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="ml-3">Help</span>
                </button>
              </Link>
            </li>

            {/* HOMEPAGE */}
            <li>
              <Link to={"/"}>
                <button
                  type="button"
                  className="w-full flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 12V21H9V15H15V21H21V12L12 3L3 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="ml-3">Homepage</span>
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <main className="ml-64 h-fit w-full">{outlet || <Intro />}</main>
    </div>
  );
}
