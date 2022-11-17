import Link from "next/link";
import { IPost } from "~/lib/types";

type Props = IPost;

export default function Featured({ title, author, date, topic, slug }: Props) {
  return (
    <div className="dark:bg-altdark mt-4 flex max-w-sm flex-col rounded-lg bg-white px-8 py-6 shadow-md">
      <div className="flex items-center">
        <Link href={`/topic/${topic}`}>
          <a className="bg-primary rounded px-2 py-1 text-sm text-white">
            {topic}
          </a>
        </Link>
      </div>
      <div className="mt-4">
        <Link href={`/posts/${slug}`}>
          <a className="text-dark text-lg font-bold hover:underline dark:text-white">
            {title}
          </a>
        </Link>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <Link href={`/author/${author?.username}`}>
            <a className="flex items-center">
              <img
                src={`/img/team/${author?.photo}`}
                alt="avatar"
                className="h-8 w-8 rounded-full object-cover"
              />
              <h1 className="mx-3 text-sm text-gray-700 hover:underline dark:text-white">
                {author?.name}
              </h1>
            </a>
          </Link>
        </div>
        <span className="text-sm font-light text-gray-600 dark:text-white">
          {date}
        </span>
      </div>
    </div>
  );
}
