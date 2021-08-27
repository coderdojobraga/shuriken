export default function Pagination() {
  return (
    <div class="mt-8 ml-20">
      <div class="flex">
        <a
          href="#"
          class="px-3 py-2 mx-1 font-medium text-gray-500 hover:text-primary rounded-md cursor-not-allowed dark:text-white"
        >
          previous
        </a>

        <a
          href="#"
          class="px-3 py-2 mx-1 font-medium text-gray-700 rounded-md hover:bg-primary hover:text-white dark:text-white"
        >
          1
        </a>

        <a
          href="#"
          class="px-3 py-2 mx-1 font-medium text-gray-700 rounded-md hover:bg-primary hover:text-white dark:text-white"
        >
          2
        </a>

        <a
          href="#"
          class="px-3 py-2 mx-1 font-medium text-gray-700 rounded-md hover:bg-primary hover:text-white dark:text-white"
        >
          3
        </a>

        <a
          href="#"
          class="px-3 py-2 mx-1 font-medium text-gray-700 rounded-md hover:bg-primary hover:text-white dark:text-white"
        >
          Next
        </a>
      </div>
    </div>
  );
}
