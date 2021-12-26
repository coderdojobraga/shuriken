import { useTheme } from "../../../components/Theme";

export default function Entry({ title, description, author, date, photo, topic, slug }) {
  const { isDark } = useTheme();

  return (
    <div class={`${isDark ? "dark" : "light"} mt-6`}>
      <div class="max-w-4xl px-10 py-6 dark:bg-altdark bg-white rounded-lg shadow-md">
        <div class="flex items-center justify-between">
          <span class="font-light dark:text-white text-gray-600">{date}</span>
          <a href={`/blog/topic/${topic}`} class="px-2 py-1 font-bold text-white bg-primary rounded">
            {topic}
          </a>
        </div>
        <div class="mt-2">
        <a
            href={`/posts/${slug}`}
            class="text-2xl font-bold dark:text-white text-dark hover:text-primary hover:underline"
          >
            {title}
          </a>
          <p class="mt-2 dark:text-white text-gray-600">{description}</p>
        </div>
        <div class="flex items-center justify-between mt-4">
          <a href={`posts/${slug}`} class="dark:text-white text-primary hover:underline">
            Read more
          </a>
          <div>
            <a href="#" class="flex items-center">
              <h1 class="font-bold dark:text-white text-dark hover:underline">
                {author}
              </h1>
              <img
                src={`/img/team/${photo}`}
                alt="avatar"
                class="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
