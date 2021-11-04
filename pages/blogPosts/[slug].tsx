import React from 'react';
import matter from 'gray-matter';

import BlogPost from '../../components/BlogPost';

import { Footer, Header } from "../../landing";

import fs from 'fs';
import { join } from 'path';

const postsDirectory = 'content/blog/';


const BlogPostPage = ({content, data}) => {
  
    return (
        <>  
            <Header/>
            <BlogPost content={content} data={data}/>
            <Footer bgColor="dark" fgColor="white"/>
        </>
    );
};

export async function getServerSideProps(context: { query: { slug: string; }; }) {
    const { slug } = context.query;

    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
  
    const  {data, content} = matter(fileContents);
  
    return { props: {
                data: data, 
                content: content,
            }
        };
}

export default BlogPostPage;