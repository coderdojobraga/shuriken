import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { Footer, Header, Hero } from "@landing";

export default function BlogPost(props) {

    var src = '# I am using __Markdown Previewer__.\n ====*====\n\nMade For FCC\n-----------\n \n### at [Codepen.io](https://codepen.io/soni7raj/full/ggmveM/)\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nUser Stories:\n\n  * I can type GitHub-flavored Markdown into a text area\n  * I can see a preview of the output of my markdown that is updated as I type\n  \n\n\n *[Rajkumar Soni](https://www.freecodecamp.com/soni7raj)*';
    return (
        <>
            <Header/>
            <div className="container mx-auto">
                <div className="grid md:grid-cols-3 items-center mx-2 lg:mx-12 xl:mx-20">
                    <div className="flex flex-row justify-center order-last md:justify-start md:order-first">
                        <ReactMarkdown className="reactMarkDown" remarkPlugins={[remarkGfm]}>{src}</ReactMarkdown>
                    </div>
                </div>
            </div>
            
            <Footer bgColor="dark" fgColor="white"/>
        </>
    );
};