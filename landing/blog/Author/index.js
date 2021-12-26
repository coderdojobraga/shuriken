export default function Author({ author, photo, numberPosts }) {
  return (
    <li class="flex items-center py-1">
      <img
        src={`/img/team/${photo}`}
        alt="avatar"
        class="object-cover w-10 h-10 mx-4 rounded-full"
      />
      <p>
        <a href="#" class="mx-1 font-bold dark:text-white text-gray-700 hover:underline">
          {author}
        </a>
        <span class="text-sm font-light dark:text-white text-gray-700">
          Created {numberPosts} {numberPosts == 1 ? "Post" : "Posts"}
        </span>
      </p>
    </li>
  );
}
