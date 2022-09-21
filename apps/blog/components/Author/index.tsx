import Link from "next/link";
import { IAuthor } from "~/lib/types";

export default function Author({ name, photo, username }: IAuthor) {
  return (
    <li className="flex items-center py-1">
      <img
        src={`/img/team/${photo}`}
        alt="avatar"
        className="mx-4 h-10 w-10 rounded-full object-cover"
      />
      <p>
        <Link href={`/author/${username}`}>
          <a className="mx-1 font-bold text-gray-700 hover:underline dark:text-white">
            {name}
          </a>
        </Link>
      </p>
    </li>
  );
}
