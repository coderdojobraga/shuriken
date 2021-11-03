import MarkdownRenderer from '../../components/MarkdownRenderer';

import styles from './style.module.css';


import { CalendarOutlined } from  '@ant-design/icons';

export default function BlogPost(props) {
    return (
        <div className="container mx-auto">      
            <div className={styles.blogContainer}>
                <div className={styles.header}>
                    <img src="../img/team/lelis.png"/>
                    <h1 className={styles.title}>{props.data.title}</h1>
                    <h2 className={styles.author}>{props.data.author}</h2>
                    <h3><CalendarOutlined/>{props.data.date}</h3>
                </div>
                
                <MarkdownRenderer markdown={props.content}/>
            </div>
        </div>
    );
}