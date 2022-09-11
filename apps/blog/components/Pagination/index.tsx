export default function Pagination({
  postCount,
  currentPage,
  postsPerPage,
  onChange,
}: any) {
  let numberPages = Math.floor(postCount / postsPerPage);

  const onClick = (e: any, n: number) => {
    e.preventDefault();

    if (n > 0 && n <= numberPages) {
      onChange(n);
    }
  };
  return (
    <div className="mt-8 ml-20">
      <div className="flex">
        {numberPages > 1 ? (
          <a
            onClick={(e) => onClick(e, currentPage - 1)}
            className={`hover:text-primary mx-1 rounded-md px-3 py-2 font-medium text-gray-500 ${
              currentPage == 1 ? "cursor-not-allowed" : ""
            } dark:text-white`}
          >
            previous
          </a>
        ) : (
          <></>
        )}

        {numberPages > 1 ? (
          <a
            onClick={(e) => onClick(e, 1)}
            className={`mx-1 px-3 py-2 font-medium text-${
              currentPage == 1 ? "primary" : "gray-700"
            } hover:bg-primary rounded-md hover:text-white dark:text-white`}
          >
            1
          </a>
        ) : (
          <></>
        )}

        {numberPages >= 2 ? (
          <a
            onClick={(e) => onClick(e, 2)}
            className={`mx-1 px-3 py-2 font-medium text-${
              currentPage == 2 ? "primary" : "gray-700"
            } hover:bg-primary rounded-md hover:text-white dark:text-white`}
          >
            2
          </a>
        ) : (
          <></>
        )}

        {numberPages >= 3 ? (
          <a
            onClick={(e) => onClick(e, 3)}
            className={`mx-1 px-3 py-2 font-medium text-${
              currentPage == 3 ? "primary" : "gray-700"
            } hover:bg-primary rounded-md hover:text-white dark:text-white`}
          >
            3
          </a>
        ) : (
          <></>
        )}

        {numberPages >= 5 ? (
          <a className="hover:bg-primary mx-1 rounded-md px-3 py-2 font-medium text-gray-700 hover:text-white dark:text-white">
            ...
          </a>
        ) : (
          <></>
        )}

        {numberPages >= 4 ? (
          <a
            onClick={(e) => onClick(e, numberPages)}
            className={`mx-1 px-3 py-2 font-medium text-${
              currentPage == numberPages ? "primary" : "gray-700"
            } hover:bg-primary rounded-md hover:text-white dark:text-white`}
          >
            {numberPages}
          </a>
        ) : (
          <></>
        )}

        {numberPages > 1 ? (
          <a
            onClick={(e) => onClick(e, currentPage + 1)}
            className={`hover:text-primary mx-1 rounded-md px-3 py-2 font-medium text-gray-500 ${
              currentPage == numberPages ? "cursor-not-allowed" : ""
            } dark:text-white`}
          >
            Next
          </a>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
