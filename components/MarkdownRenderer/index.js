import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import styles from './style.module.css';

export default function MarkdownRenderer(props) {
    return (
        <div className={styles.markdown}>
            <ReactMarkdown children={props.markdown} remarkPlugins={[remarkGfm]}/>
        </div>
        
    );
}