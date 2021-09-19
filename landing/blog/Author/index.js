export default function Author({ author, photo, numberPosts }) {
  return (
    <li className="flex items-center py-1">
      <img
        src={`img/team/${photo}`}
        alt="avatar"
        className="object-cover w-10 h-10 mx-4 rounded-full"
      />
      <p>
        <a href="#" className="mx-1 font-bold text-gray-700 hover:underline">
          {author}
        </a>
        <span className="text-sm font-light text-gray-700">
          Created {numberPosts} Posts
        </span>
      </p>
    </li>
  );
}
