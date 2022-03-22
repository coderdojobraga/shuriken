import Image from "next/image";

import MarkdownRenderer from "~/components/MarkdownRenderer";

import { useTheme } from "~/components/Theme";

import { CalendarOutlined } from "@ant-design/icons";

interface Props {
  title: string;
  photo: string;
  author: {
    name: string;
    photo: string;
  };
  date: string;
  content: string;
}

const BlogPost = ({ title, author, date, content }: Props) => {
  const { isDark } = useTheme();
  return (
    <div className={`${isDark ? "dark" : "light"} container mx-auto dark:bg-dark`}>
      <div className="m-16">
        <div className="mb-16">
          <h1 className="block text-6xl font-bold my-4 dark:text-white">{title}</h1>

          <div>
            <div className="float-left mr-2">
              <Image className="rounded-full" alt={author.name} src={`/img/team/${author.photo}`} height="30rem" width="30rem"/>
            </div>
            
            <h2 className="dark:text-white text-2xl">{author.name}</h2>
          </div>

          <div className="mt-5">
            <CalendarOutlined className="float-left text-md mx-3 my-1" />
            <h3 className="dark:text-white text-md">{date}</h3>
          </div>
        </div>

        <MarkdownRenderer markdown={content} />
      </div>
    </div>
  );
};

export default BlogPost;
