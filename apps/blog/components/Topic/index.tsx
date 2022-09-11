import Link from "next/link";

interface Props {
  title: string;
}

export default function Topic({ title }: Props) {
  return (
    <Link href={`/topic/${title}`}>
      <a className="bg-primary mx-1 my-2 rounded px-2 py-2 font-bold text-white">
        {title}
      </a>
    </Link>
  );
}
