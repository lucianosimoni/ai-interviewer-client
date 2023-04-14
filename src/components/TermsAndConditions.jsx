import { useNavigate } from "react-router-dom";

export default function TermsAndConditions() {
  const navigate = useNavigate();
  return (
    <>
      <main className="flex h-screen justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="text-center place-self-center">
          <h1 className="mb-2">Come back later for it</h1>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Back to homepage
          </button>
        </div>
      </main>
    </>
  );
}
