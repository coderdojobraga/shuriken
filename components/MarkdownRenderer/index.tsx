import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {materialDark} from 'react-syntax-highlighter/dist/esm/styles/prism'

import styles from './style.module.css';

const MarkdownRenderer = (props) => {

    const inlineStyling = {
        height: "1.2rem", 
        textAlign: "center", 
        top: "0", 
        bottom: "0", 
        padding: "0.2rem 1rem 0.2rem 1rem", 
        marginTop: "-0.05rem", 
        marginBottom: "-0.2rem",
        display: "inline-block"
    };

    return (
        <div className={styles.markdown}>
            <ReactMarkdown children={props.markdown} remarkPlugins={[remarkGfm]} components={{
                code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')

                if(match && inline) {
                    return (<SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        PreTag="div"
                        language={match[1]}
                        style={materialDark}
                        customStyle={inlineStyling}
                        {...props}/>);
                } else if(inline) {
                    return (<SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        PreTag="div"
                        style={materialDark}
                        customStyle={inlineStyling}
                        {...props}/>);
                } else if(match) {
                    return (<SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        PreTag="div"
                        language={match[1]}
                        style={materialDark}
                        {...props}/>);
                } else {
                    return (<SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        PreTag="div"
                        style={materialDark}
                        {...props}/>);
                }
                }}}/>
        </div>    
    );
};

export default MarkdownRenderer;