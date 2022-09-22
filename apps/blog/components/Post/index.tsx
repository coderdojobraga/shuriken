import Image from "next/image";
import { CalendarOutlined } from "@ant-design/icons";
import { useTheme } from "@coderdojobraga/ui";

import Markdown from "~/components/Markdown";
import { IPost } from "~/lib/types";

type Props = IPost;

const Post = ({ title, author, date, content }: Props) => {
  const { isDark } = useTheme();
  return (
    <div
      className={`${isDark ? "dark" : "light"} dark:bg-dark container mx-auto`}
    >
      <div className="m-16">
        <div className="mb-16">
          <h1 className="my-4 block text-6xl font-bold dark:text-white">
            {title}
          </h1>

          <div>
            <div className="float-left mr-2">
              <Image
                className="rounded-full"
                alt={author?.name}
                src={`/img/team/${author.photo}`}
                height="30rem"
                width="30rem"
              />
            </div>

            <h2 className="text-2xl dark:text-white">{author?.name}</h2>
          </div>

          <div className="mt-5">
            <CalendarOutlined className="text-md float-left mx-3 my-1" />
            <h3 className="text-md dark:text-white">{date}</h3>
          </div>
        </div>

        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
};

export default Post;
