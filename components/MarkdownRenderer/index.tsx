import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import styles from "./style.module.css";

const MarkdownRenderer = (props: { markdown: string }) => {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        children={props.markdown}
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");

            if (match && !inline) {
              return (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  PreTag="div"
                  language={match[1]}
                  style={materialDark}
                  {...props}
                />
              );
            } else if (!inline) {
              return (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  PreTag="div"
                  style={materialDark}
                  {...props}
                />
              );
            } else {
              return <span>{children}</span>;
            }
          },
        }}
      />
    </div>
  );
};

export default MarkdownRenderer;
