import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "../ErrorPopup";
import LoadingSpinner from "../LoadingSpinner";
import { LoggedInUserContext } from "../LoggedInUserContext";

export default function NewInterview() {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const [error, setError] = useState({ visible: false, message: "" });
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const [maxRound, level] = event.target;
    // TODO: Limit max rounds
    const body = {
      userId: loggedInUser.id,
      maxRound: Number(maxRound.value),
      level: level.value,
    };
    const url = window.location.href;
    const apiUrl = url.includes("ai-interviewer")
      ? "https://ai-interviewer.onrender.com"
      : "http://192.168.1.251:3000";
    const axiosConfig = {
      headers: { Authorization: `Bearer ${loggedInUser.token}` },
    };

    axios
      .post(`${apiUrl}/interview`, body, axiosConfig)
      .then((res) => {
        setLoading(false);
        const interview = res.data.createdInterview;
        navigateTo(`/interview/${interview.id}`);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError({
          visible: true,
          message: error.message
            ? error.message
            : "An error Occured. Please Reflesh",
        });
      });
  };

  return (
    <>
      {loading ? <LoadingSpinner /> : null}
      {error.visible ? <ErrorPopup error={error} setError={setError} /> : null}

      <main className="h-full bg-white dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl flex flex-col gap-4 px-4 lg:px-12">
          <h1 className="text-center text-2xl mt-3 lg:hidden text-gray-900 dark:text-white font-bold">
            Start a new Interview
          </h1>

          <div className="bg-white dark:bg-gray-800 relative shadow-md rounded-lg overflow-hidden">
            {/* HEADER */}
            <div className="flex justify-between items-center p-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="hidden lg:block text-2xl text-gray-900 dark:text-white font-bold">
                Create a new Interview
              </h3>
              <h3 className="lg:hidden text-sm text-gray-900 dark:text-white">
                How many rounds of interview and its level.
              </h3>
              {/* CLOSE BUTTON */}
              <div className="w-auto flex flex-row space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  onClick={() => navigateTo(-1)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
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
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
            </div>

            {/* BODY */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* MAX ROUNDS */}
                <section>
                  <label
                    htmlFor="maxRounds"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Max Rounds
                  </label>
                  <input
                    type="number"
                    name="maxRounds"
                    id="maxRounds"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="5"
                    required
                  />
                </section>

                {/* LEVEL */}
                <section>
                  <label
                    htmlFor="level"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Level
                  </label>
                  <select
                    id="level"
                    className="bg-gray-50 py-2.5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    style={{ lineHeight: "20px", WebkitAppearance: "initial" }}
                  >
                    <option value="Junior">Junior</option>
                    <option value="Mid" disabled={true}>
                      Mid-level
                    </option>
                    <option value="Senior" disabled={true}>
                      Senior
                    </option>
                  </select>
                </section>
              </div>

              {/* START */}
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="mr-2 -ml-1 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M20.267 12.92L5.743 20.195a1 1 0 01-1.474-.87V4.674a1 1 0 011.474-.87l14.524 7.275a1 1 0 010 1.743z"
                    clipRule="evenodd"
                  />
                </svg>
                Start interview
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
