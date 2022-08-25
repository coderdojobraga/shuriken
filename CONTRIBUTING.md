# Contributing

When contributing to this repository, please first discuss the change you wish
to make via issue, email, or any other method with the owners of this
repository before making a change.

Please note we have a [Code of Conduct](CODE_OF_CONDUCT.md), please follow it
in all your interactions with the project.

# Contributing to the blog

First of all, thank you for wanting to contribute for our blog &#128077;. This section contains all the information you need to know to contribute to our blog page. Should you have any questions, feel free to contact us and we will try our best in answering them.

## Before writing

### Cloning and creating a new branch

If you have decided to contribute to our blog, the first thing you need to do is clone the repository and creating a new branch where you will be writing our post. In other words, you should run the following commands:

```
git clone https://github.com/coderdojobraga/shuriken.git
cd shuriken
git switch -c your-branch-name
```

where `your-branch-name` should be your initials (first letter of the your first and last name) folowed by `/blog/your-post-topic` . For example, if your name is João Silva and you are writing about how to make an hello world in python, your branch name would be something like `js/blog/python-hello-world`.

In alternative, you can run our `create-blog-post.sh` script like

```
sh create-blog-post.sh your-branch-name your-blog-post-name
```

### Note for those not a part of the Coderdojo Braga team

If you are not a member of our team on Github, then instead of creating a branch you need to fork this project. If you don't know how to do that, please [refer to this guide](https://docs.github.com/pt/enterprise-cloud@latest/get-started/quickstart/fork-a-repo).

## Bug reports

If you encounter a bug during writing, please message us. **_Do not open an issue_**. If it is something important it will be fixed. Or, if you have the time, you can try and fix it for us &#128512;.

## Opening a PR

After you are done writing, commit your changes to your branch and push.

```
git add *your changed files*
git commit -m "Your commit message"
git push
```

Now all that is left to do is opening a Pull Request so your post can be published. If you don't know how to open a Pull Request, please refer to [this guide](https://docs.github.com/pt/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). **_Don't forget to select the reviewers_**. At least, you should put [Filipe Felício](https://github.com/feliciofilipe) and [Rui Oliveira](https://github.com/ruioliveira02).
Once your PR is approved, your blog will be pushed to main and to production. Congratulations, you just contributed to the CoderDojo Braga's blog &#128077;.

## Previewing your work

To preview your amazing work, run shuriken (`npm run dev`) and open your page. It should be in http://localhost:3000/posts/your-post-name.

# Contributing to the blog

First of all, thank you for wanting to contribute for our blog &#128077;. This section contains all the information you need to know to contribute to our blog page. Should you have any questions, feel free to contact us and we will try our best in answering them.

## Before writing

### Creating the markdown file

If you don't know already, our blog is a collection of Markdown files. So, in order to write your own post, you must first create a .md file. To create the file, navigate to the posts directory `content/blog `and create your file.

```
cd content/blog
touch your-post-name.md
```

Now you can just open your favorite editor and start writing.

#### File name

The name of your file should be the same as the branch you created. So, João, in the previous example, would have to create a file named `python-hello-world.md`. All initials should be lowercase letters and words should be separated by a `-`.

## During writing

### Meta data

The first part of your file should be metadata used by the website to correctly display your post. Currently, it should look like this:

```
---
title: "Your title"
date: "Publishing date"
author: "your name"
photo: "path to your image"
draft: true/false
featured: true/false
---
```

The date should be in the `yyyy-mm-dd`format, and you should set it to a few days after you intend on creating a PR (if you don't know what that means, read to the end). Your image should be under `../img/team/`. If you don't have an image yet, upload one to that directory and include it in your branch. So, your `photo` should look like `../img/team/your-photo.format`. If you aren't done writing, set the `draft`property to `true`.

If your post is very relevant it should be featured on our main page. If that is the case, set the `feature` to true. However, always consult with the dev team on whether or not your post should be featured before setting that property.

### Markdown Support

Currently not all of Markdown features are supported. Here is a list of all important nuances you should take into account when writing:

- Inline code is not supported, _yet_
- If you want to use emojis, you have to use the corresponding [HTML character](https://www.w3schools.com/charsets/ref_emoji.asp)
- Headings are only supported until 3 `#`
- Superscript and subscript are not supported

### Previewing your work

To preview your amazing work, run shuriken (`npm run dev`) and open your page. It should be in http://localhost:3000/blogPosts/your-post-name.

## After writing

After you are done writing, commit your changes to your branch and push.

```
git add content/blog/your-post-name.md
git commit -m "Your commit message"
git push
```

Now all that is left to do is opening a Pull Request so your post can be published. If you don't know how to open a Pull Request, please refer to [this guide](https://docs.github.com/pt/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). **_Don't forget to select the reviewers_**. At least, you should put [Filipe Felício](https://github.com/feliciofilipe) and [Rui Oliveira](https://github.com/ruioliveira02).
Once your PR is approved, your blog will be pushed to main and to production. Congratulations, you just contributed to the CoderDojo Braga's blog &#128077;.
