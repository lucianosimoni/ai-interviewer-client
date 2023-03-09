export default function ErrorPopup({ error, setError }) {
  return (
    <div
      id="info-popup"
      tabIndex="-1"
      className="z-50 flex place-content-center items-center align-middle bg-gradient-to-t from-gray-900 to-transparent fixed bottom-0 w-full overflow-y-auto overflow-x-hidden md:inset-0 h-modal md:h-full"
    >
      <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
          <div className="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
            <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
              🔴 {error.message}
            </h3>
          </div>
          <div className="justify-between items-center pt-0 space-y-4 sm:flex sm:space-y-0">
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
