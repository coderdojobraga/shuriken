import React from 'react';
import matter from 'gray-matter';

import BlogPost from '../../components/BlogPost';

import { Footer, Header } from "../../landing";



export default function BlogPostPage({content, data}) {
    //
    var src = '# I am using __Markdown Previewer__.\n 1. Create a list by starting a line with ====*====\n\nMade For FCC\n-----------\n \n### at [Codepen.io](https://codepen.io/soni7raj/full/ggmveM/)\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nUser Stories:\n\n  * I can type GitHub-flavored Markdown into a text area\n  * I can see a preview of the output of my markdown that is updated as I type\n  \n\n\n *[Rajkumar Soni](https://www.freecodecamp.com/soni7raj)*';
    return (
        <>  
            <Header/>
            <BlogPost content={content} data={data}/>
            <Footer bgColor="dark" fgColor="white"/>
        </>
    );
};

BlogPostPage.getInitialProps = async (context) => {
    const { slug } = context.query;
  
    const content = await import(`../../content/blog/${slug}.md`);
  
    const data = matter(content.default);
  
    return { ...data };

    return { slug };
}