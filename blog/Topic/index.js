export default function Topic({ title }) {
  return (
    <a
      href={`/blog/topic/${title}`}
      className="mx-1 my-2 px-2 py-2 font-bold text-white bg-primary rounded"
    >
      {title}
    </a>
  );
}
