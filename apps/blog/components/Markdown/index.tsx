import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  dark,
  solarizedLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";

import { useTheme } from "@coderdojobraga/ui";

import styles from "./style.module.css";

const Code = () => {
  const { isDark } = useTheme();

  return {
    code({ node, inline, className, children, ...props }: any) {
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
  };
};

const Markdown = ({ children }: any) => {
  const { isDark } = useTheme();
  return (
    <div
      className={isDark ? `${styles.dark} ${styles.markdown}` : styles.markdown}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={Code()}>
        {children}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
