# Blog contributing guidelines

Hi! First of all, thank you for wanting to contribute for our blog &#128077;. This document contains all the information you need to know to contribute to our blog page. Should you have any questions, feel free to contact us and we will try our best in answering them.


# Before writing
## Cloning and creating a new branch
If you have decided to contribute to our blog, the first thing you need to do is clone the repository and creating a new branch where you will be writing our post. In other words, you should run the following commands:
```
git clone https://github.com/coderdojobraga/shuriken.git
cd shuriken
git checkout -b your-branch-name
```
where `your-branch-name` should be your initials (first letter of the your first and last name) folowed by `/blog/your-post-topic` . For example, if your name is João Silva and you are writing about how to make an hello world in python, your branch name would be something like  `js/blog/python-hello-world`.

## Creating the markdown file
If you don't know already, our blog is a collection of Markdown files. So, in order to write your own post, you must first create a .md file. To create the file, navigate to the posts directory `content/blog `and create your file.
``` 
cd content/blog
touch your-post-name.md
```
Now you can just open your favorite editor and start writing.


### File name
The name of your file should be the same as the branch you created. So, João, in the previous example, would have to create a file named `python-hello-world.md`. All initials should be lowercase letters and words should be separated by a `-`.

# During writing
## Meta data
The first part of your file should be metadata used by the website to correctly display your post. Currently, it should look like this:
```
---
title: "Your title"
date: "Publishing date"
author: "your name"
authorImage: "path to your image"
--- 
```
The only thing you should have a problem with is the date and the image. The date should be in the `yyyy-mm-dd`format, and you should set it to a few days after you intend on creating a PR (if you don't know what that means, read to the end). Your image should be under `../img/team/`. If you don't have an image yet, upload one to that directory and include it in your branch. So, your `authorImage` should look like `../img/team/your-photo.format`.

## Markdown Support
Currently not all of Markdown features are supported. Here is a list of all important nuances you should take into account when writing:
+ Inline code is not supported, *yet*
+ If you want to use emojis, you have to use the corresponding [HTML character](https://www.w3schools.com/charsets/ref_emoji.asp)
+ Headings are only supported until 3 `#`
+ Superscript and subscript are not supported
## Previewing your work
To preview your amazing work, run shuriken (`npm run dev`) and open your page. It should be in http://localhost:3000/blogPosts/your-post-name.

## Bug reports
If you encounter a bug during writing, please message us. ***Do not open an issue***. If it is something important it will be fixed. Or, if you have the time, you can try and fix it for us &#128512;.

# After writing
After you are done writing, commit your changes to your branch and push.
```
git add content/blog/your-post-name.md
git commit -m "Your commit message"
git push
``` 
Now all that is left to do is opening a Pull Request so your post can be published. If you don't know how to open a Pull Request, please refer to [this guide](https://docs.github.com/pt/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). ***Don't forget to select the reviewers***. At least, you should put [Filipe Felício](https://github.com/feliciofilipe) and  [Rui Oliveira](https://github.com/ruioliveira02).
Once your PR is approved, your blog will be pushed to main and to production. Congratulations, you just contributed to the CoderDojo Braga's blog &#128077;.