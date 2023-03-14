export default function Schedule({ tittle, details, description }) {
  return (
    <div className="flex-container justify flex pl-10 xl:justify-left xl:mx-96">
      <ol className="relative border-l border-gray-200 dark:border-gray-700">
        <li className="mb-10 ml-6">
          <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-purple-900 dark:ring-gray-900">
            <svg
              aria-hidden="true"
              className="h-3 w-3 text-purple-800 dark:text-purple-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
          <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            {tittle}
          </h3>
          <time className="mb-2 block text-base font-normal leading-none text-gray-700 dark:text-gray-500">
            {details}
          </time>
          <p className="hidden text-base font-normal text-gray-500 dark:text-gray-400 sm:block">
            {description}
          </p>
        </li>
      </ol>
    </div>
  );
}
