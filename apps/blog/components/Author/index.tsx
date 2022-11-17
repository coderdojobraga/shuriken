import Link from "next/link";
import { IAuthor } from "~/lib/types";

export default function Author({ name, photo, username }: IAuthor) {
  return (
    <li className="flex items-center py-1">
      <Link href={`/author/${username}`}>
        <a className="flex items-center">
          <img
            src={`/img/team/${photo}`}
            alt="avatar"
            className="mx-4 h-10 w-10 rounded-full object-cover"
          />
          <h1 className="mx-1 font-bold text-gray-700 hover:underline dark:text-white">
            {name}
          </h1>
        </a>
      </Link>
    </li>
  );
}
