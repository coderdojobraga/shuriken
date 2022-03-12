import { useTheme } from "../../../components/Theme";

export default function Entry({
  title,
  description,
  author,
  date,
  topic,
  slug,
}) {
  const { isDark } = useTheme();

  return (
    <div className={`${isDark ? "dark" : "light"} mt-6`}>
      <div className="max-w-4xl px-10 py-6 dark:bg-altdark bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <span className="font-light dark:text-white text-gray-600">
            {date}
          </span>
          <a
            href={`/blog/topic/${topic}`}
            className="px-2 py-1 font-bold text-white bg-primary rounded"
          >
            {topic}
          </a>
        </div>
        <div className="mt-2">
          <a
            href={`/posts/${slug}`}
            className="text-2xl font-bold dark:text-white text-dark hover:text-primary hover:underline"
          >
            {title}
          </a>
          <p className="mt-2 dark:text-white text-gray-600">{description}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <a
            href={`posts/${slug}`}
            className="dark:text-white text-primary hover:underline"
          >
            Read more
          </a>
          <div>
            <a
              href={`/blog/author/${author.name}`}
              className="flex items-center"
            >
              <h1 className="font-bold dark:text-white text-dark hover:underline">
                {author.name}
              </h1>
              <img
                src={`/img/team/${author.photo}`}
                alt="avatar"
                className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
