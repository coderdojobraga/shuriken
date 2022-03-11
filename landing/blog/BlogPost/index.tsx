import MarkdownRenderer from "../../../components/MarkdownRenderer";

import styles from "./style.module.css";

import { CalendarOutlined } from "@ant-design/icons";

interface Props {
  title: string;
  photo: string;
  author: string;
  date: string;
  content: string;
}

const BlogPost = ({ title, photo, author, date, content }: Props) => {
  return (
    <div className="container mx-auto">
      <div className={styles.blogContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>

          <div>
            <img className={styles.photo} src={`/img/team/${photo}`} />
            <h2 className={styles.author}>{author}</h2>
          </div>

          <div className={styles.dateWrapper}>
            <CalendarOutlined className={styles.calendar} />
            <h3>{date}</h3>
          </div>
        </div>

        <MarkdownRenderer markdown={content} />
      </div>
    </div>
  );
};

export default BlogPost;
