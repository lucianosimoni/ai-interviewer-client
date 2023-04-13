import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorPopup from "../ErrorPopup";
import LoadingSpinner from "../LoadingSpinner";
import { LoggedInUserContext } from "../LoggedInUserContext";

export default function Overview() {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ visible: false, message: "" });

  useEffect(() => {
    setLoading(true);
    if (!loggedInUser) {
      return;
    }

    const url = window.location.href;
    const apiUrl = url.includes("ai-interviewer")
      ? "https://ai-interviewer.onrender.com"
      : "http://192.168.1.251:3000";
    const axiosConfig = {
      headers: { Authorization: `Bearer ${loggedInUser.token}` },
    };

    axios
      .get(`${apiUrl}/interview/user/${loggedInUser.id}`, axiosConfig)
      .then((res) => {
        setLoading(false);
        sortInterviews(res.data.userInterviews);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError({
          visible: true,
          message: "An error Occured. Please Reflesh",
        });
      });
  }, [loggedInUser]);

  const sortInterviews = (interviews) => {
    const sortedInterviews = [...interviews].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setInterviews(sortedInterviews);
  };

  return (
    <>
      {loading ? <LoadingSpinner /> : null}
      {error.visible ? <ErrorPopup error={error} setError={setError} /> : null}

      <section className="h-full bg-white dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl flex flex-col gap-4 px-4 lg:px-12">
          <h1 className="text-center text-2xl mt-3 lg:hidden text-gray-900 dark:text-white font-bold">
            Interviews overview
          </h1>
          <div className="bg-white dark:bg-gray-800 relative shadow-md rounded-lg overflow-hidden">
            {/* HEADER */}
            <div className="flex flex-row items-center justify-end lg:justify-between space-y-0 md:space-x-4 p-4">
              <h1 className="hidden lg:block text-2xl text-gray-900 dark:text-white font-bold">
                Interviews overview
              </h1>
              <div className="w-auto flex flex-row space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                {/* ACTION BUTTON */}
                <Link to={"/dashboard/new-interview"}>
                  <button
                    type="button"
                    className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    <svg
                      className="h-3.5 w-3.5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      />
                    </svg>
                    New Interview
                  </button>
                </Link>
              </div>
            </div>

            {/* INTERVIEW TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                {/* TABLE HEAD */}
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Type
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Level
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Good
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Rounds
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Date
                    </th>
                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                  {/* LOOP THROUGH THE INTERVIEWS OF THIS USER */}
                  {interviews.map((interview, index) => {
                    return (
                      <tr key={index} className="border-b dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Interview
                        </th>
                        <td className="px-4 py-3">{interview.level}</td>
                        <td className="px-4 py-3">
                          {interview.good ? "True" : "False"}
                        </td>
                        <td className="px-4 py-3">{interview.maxRound}</td>
                        <td className="px-4 py-3">
                          {new Date(interview.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {!interviews.length ? (
              <h3 className="w-full text-center my-4 text-gray-900 dark:text-white">
                You don't have any interviews yet.
              </h3>
            ) : (
              <nav
                className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                aria-label="Table navigation"
              >
                {/* LABELS */}
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Showing{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    1-25
                  </span>{" "}
                  of
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {" "}
                    1
                  </span>
                </span>

                {/* NAVIGATION */}
                <ul className="inline-flex items-stretch -space-x-px">
                  {/* PREVIOUS */}
                  <li>
                    <button
                      type="button"
                      disabled={true}
                      className="disabled:opacity-40 items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>

                  {/* PAGES */}
                  <li>
                    <button
                      type="button"
                      className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      1
                    </button>
                  </li>

                  {/* NEXT */}
                  <li>
                    <button
                      type="button"
                      disabled={true}
                      className="disabled:opacity-40 flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
