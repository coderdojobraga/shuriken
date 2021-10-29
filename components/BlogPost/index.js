import MarkdownRenderer from '../../components/MarkdownRenderer';

import styles from './style.module.css';

export default function BlogPost(props) {
    return (
        <div className="container mx-auto">
            <div className={styles.blogContainer}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{props.data.title}</h1>
                    <h2 className={styles.author}>{props.data.author}</h2>
                    <h3>{props.data.date}</h3>
                </div>
                
                <MarkdownRenderer markdown={props.content}/>
            </div>
        </div>
    );
}