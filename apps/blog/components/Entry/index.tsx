import Link from "next/link";
import { useTheme } from "@coderdojobraga/ui";

export default function Entry({
  title,
  description,
  author,
  date,
  topic,
  slug,
}: any) {
  const { isDark } = useTheme();

  return (
    <div className={`${isDark ? "dark" : "light"} mt-6`}>
      <div className="dark:bg-altdark max-w-4xl rounded-lg bg-white px-10 py-6 shadow-md">
        <div className="flex items-center justify-between">
          <span className="font-light text-gray-600 dark:text-white">
            {date}
          </span>
          <Link href={`/topic/${topic}`}>
            <a className="bg-primary rounded px-2 py-1 font-bold text-white">
              {topic}
            </a>
          </Link>
        </div>
        <div className="mt-2">
          <Link href={`/posts/${slug}`}>
            <a className="text-dark hover:text-primary text-2xl font-bold hover:underline dark:text-white">
              {title}
            </a>
          </Link>
          <p className="mt-2 text-gray-600 dark:text-white">{description}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Link href={`posts/${slug}`}>
            <a className="text-primary hover:underline dark:text-white">
              Read more
            </a>
          </Link>
          <div>
            <Link href={`/author/${author?.username}`}>
              <a className="flex items-center">
                <h1 className="text-dark font-bold hover:underline dark:text-white">
                  {author?.name}
                </h1>
                <img
                  src={`/blog/img/team/${author?.photo}`}
                  alt="avatar"
                  className="mx-4 hidden h-10 w-10 rounded-full object-cover sm:block"
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
