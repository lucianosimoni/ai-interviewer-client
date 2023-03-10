export default function ErrorPopup({ error, setError }) {
  return (
    <div
      id="info-popup"
      className="fixed z-50 flex place-content-center items-center bg-gradient-to-t from-gray-900 to-transparent w-full md:inset-0 h-modal md:h-full"
    >
      <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
          {/* MESSAGES */}
          <div className="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
            {/* X CLOSE */}
            <button
              type="button"
              onClick={() => setError({ visible: false, message: "" })}
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>

            {/* ICON */}
            <svg
              aria-hidden="true"
              class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>

            {/* Message */}
            <h3 class="mb-5 text-center text-lg font-normal text-gray-500 dark:text-gray-400">
              {error.message}
            </h3>
          </div>
          <div className="flex justify-center pt-0 space-y-4 sm:flex sm:space-y-0">
            <div className="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
              <button
                id="confirm-button"
                type="button"
                onClick={() => setError({ visible: false, message: "" })}
                className="py-2 px-12 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-auto hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
