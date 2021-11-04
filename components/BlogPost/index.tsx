import MarkdownRenderer from '../MarkdownRenderer';

import styles from './style.module.css';


import { CalendarOutlined } from  '@ant-design/icons';

const BlogPost = (props: { data: { title: string; authorImage: string; author: string; date: string }; content: string; }) => {
    return (
        <div className="container mx-auto">      
            <div className={styles.blogContainer}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{props.data.title}</h1>

                    <div>
                        <img className={styles.authorImage} src={props.data.authorImage}/>
                        <h2 className={styles.author}>{props.data.author}</h2>
                    </div>
                    
                    <div className={styles.dateWrapper}>
                        <CalendarOutlined className={styles.calendar}/>
                        <h3>{props.data.date}</h3>
                    </div>
                    
                </div>
                
                <MarkdownRenderer markdown={props.content}/>
            </div>
        </div>
    );
}

export default BlogPost;