import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  solarizedLight,
  dark,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";

import styles from "./style.module.css";
import { useTheme } from "~/components/Theme";

const MarkdownRenderer = (props: { markdown: string }) => {
  const { isDark } = useTheme();
  return (
    <div
      className={isDark ? `${styles.dark} ${styles.markdown}` : styles.markdown}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");

            if (match && !inline) {
              return (
                <SyntaxHighlighter
                  PreTag="div"
                  language={match[1]}
                  style={isDark ? dark : solarizedLight}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            } else if (!inline) {
              return (
                <SyntaxHighlighter
                  PreTag="div"
                  style={isDark ? dark : solarizedLight}
                >
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
