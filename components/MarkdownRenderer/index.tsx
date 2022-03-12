import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import styles from "./style.module.css";

const MarkdownRenderer = (props: { markdown: string }) => {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");

            if (match && !inline) {
              return (
                <SyntaxHighlighter PreTag="div" language={match[1]} {...props}>
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            } else if (!inline) {
              return (
                <SyntaxHighlighter PreTag="div" {...props}>
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            } else {
              return <span>{children}</span>;
            }
          },
        }}
      >
        {props.markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
