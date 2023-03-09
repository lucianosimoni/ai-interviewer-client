import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <main className="bg-white dark:bg-gray-900 h-screen flex">
        <div className="place-self-center mx-auto text-center py-8 px-4 lg:py-16 lg:px-6">
          <h1 className="mb-4 text-9xl tracking-tight font-extrabold text-blue-600 dark:text-blue-500">
            {error.status}
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            {error.statusText || error.message}
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry about that. Let me take you to a better page.
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-900 my-4"
          >
            Back to Homepage
          </button>
        </div>
      </main>
    </>
  );
}
