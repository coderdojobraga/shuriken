export default function Feature({ title, author, date, topic, slug }) {
  return (
    <div className="dark:bg-altdark mt-4 flex flex-col max-w-sm px-8 py-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center">
        <a
          href={`/blog/topic/${topic}`}
          className="px-2 py-1 text-sm text-white bg-primary rounded"
        >
          {topic}
        </a>
      </div>
      <div className="mt-4">
        <a
          href={`/posts/${slug}`}
          className="text-lg font-bold dark:text-white text-dark hover:underline"
        >
          {title}
        </a>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <img
            src={`/img/team/${author.photo}`}
            alt="avatar"
            className="object-cover w-8 h-8 rounded-full"
          />
          <a
            href={`/blog/author/${author.name}`}
            className="mx-3 text-sm dark:text-white text-gray-700 hover:underline"
          >
            {author.name}
          </a>
        </div>
        <span className="text-sm font-light dark:text-white text-gray-600">
          {date}
        </span>
      </div>
    </div>
  );
}
