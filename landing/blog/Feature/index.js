export default function Feature({ title, author, date, photo, topic, slug }) {
  return (
    <div class="dark:bg-altdark mt-4 flex flex-col max-w-sm px-8 py-6 bg-white rounded-lg shadow-md">
      <div class="flex items-center">
        <a
          href={`/blog/topic/${topic}`}
          class="px-2 py-1 text-sm text-white bg-primary rounded"
        >
          {topic}
        </a>
      </div>
      <div class="mt-4">
        <a
          href={`/posts/${slug}`}
          class="text-lg font-bold dark:text-white text-dark hover:underline"
        >
          {title}
        </a>
      </div>
      <div class="flex items-center justify-between mt-4">
        <div class="flex items-center">
          <img
            src={`/img/team/${photo}`}
            alt="avatar"
            class="object-cover w-8 h-8 rounded-full"
          />
          <a
            href={`/blog/author/${author}`}
            class="mx-3 text-sm dark:text-white text-gray-700 hover:underline"
          >
            {author}
          </a>
        </div>
        <span class="text-sm font-light dark:text-white text-gray-600">
          {date}
        </span>
      </div>
    </div>
  );
}
