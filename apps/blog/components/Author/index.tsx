import Link from "next/link";
import { IAuthor } from "~/lib/types";
import Image from "next/image";

export default function Author({ name, photo, username }: IAuthor) {
  return (
    <li className="flex items-center py-2">
      <Link href={`/author/${username}`}>
        <a className="ml-7 flex items-center">
          <Image
            src={`/img/team/${photo}`}
            alt="avatar"
            height={40}
            width={40}
            className="mx-4 h-10 w-10 rounded-full object-cover"
          />
          <h1 className="mx-1 ml-3 font-bold text-gray-700 hover:underline dark:text-white">
            {name}
          </h1>
        </a>
      </Link>
    </li>
  );
}
