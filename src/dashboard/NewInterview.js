import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorPopup from "../ErrorPopup";
import LoadingSpinner from "../LoadingSpinner";

export default function NewInterview({ loggedInUser }) {
  // FIXME: Background going white if screen has height too small
  const [error, setError] = useState({ visible: false, message: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const [maxRound, level] = event.target;

    // TODO: Limit max rounds
    const body = {
      maxRound: Number(maxRound.value),
      level: level.value,
    };

    // Post new Interview
    setLoading(true);
    await axios
      .post(`http://localhost:3000/user/${loggedInUser.id}/interview`, body)
      .then((response) => {
        setLoading(false);
        const interview = response.data.interview;
        navigate(`/interview/${interview.id}`);
      })
      .catch((error) => {
        setLoading(false);
        const errorRes = error.response.data.error;
        if (errorRes.code === 2) {
          setError({ visible: true, message: "Bad request, Missing fields." });
          return;
        }
        setError({ visible: true, message: `Error: ${error}` });
        console.error("Something happed, error: ", error);
      });
  };

  return (
    <>
      {loading ? <LoadingSpinner removeSidebarSpace={true} /> : null}
      {error.visible ? <ErrorPopup error={error} setError={setError} /> : null}

      <main className="h-full flex justify-center place-items-center bg-white dark:bg-gray-900 px-4 lg:px-12">
        <div className="text-gray-900 dark:text-white">
          <div className="overflow-y-auto overflow-x-hidden justify-center items-center w-full md:inset-0 h-modal md:h-full">
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
              {/* CONTENT */}
              <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                {/* HEADER */}
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Create a new Interview
                  </h3>
                  <Link to={"/dashboard/"}>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                  </Link>
                </div>

                {/* BODY */}
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    {/* MAX ROUNDS */}
                    <div>
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
                    </div>

                    {/* LEVEL */}
                    <div>
                      <label
                        htmlFor="level"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Level
                      </label>
                      <select
                        id="level"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      >
                        <option value="Junior">Junior</option>
                        <option value="Mid">Mid-level</option>
                        <option value="Senior">Senior</option>
                      </select>
                    </div>
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
          </div>
        </div>
      </main>
    </>
  );
}
