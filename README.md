# MyProfile - A Jekyll-powered Personal Blog

This is the repository for the MyProfile personal blog, built with Jekyll and using a customized version of the Minima theme.

## 🚀 Getting Started

To run the site locally, you'll need to have Ruby and Bundler installed.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/pargame/MyProfile.git
    cd MyProfile
    ```

2.  **Install dependencies:**
    This project uses `bundler` to manage Ruby gems. All dependencies are installed into the `vendor/bundle` directory.
    ```bash
    bundle install
    ```

3.  **Run the local server:**
    This command will build the site and start a local server at `http://localhost:4000`. The site will automatically rebuild when you make changes to the files.
    ```bash
    bundle exec jekyll serve --port 4000
    ```

---

## ✍️ Content Management

This blog is designed for easy content creation and management.

### How to Write a New Blog Post

1.  **Create a new file** in the `_posts` directory.
2.  **Name the file** using the following format: `YYYY-MM-DD-your-post-title.md`.
    *   Example: `2025-08-15-my-awesome-post.md`
3.  **Add Front Matter** to the top of the file. This is where you set the title, date, categories, and tags for your post. Use the template below as a starting point:

    ```yaml
    ---
    layout: post
    title:  "Your Awesome Post Title Here"
    date:   2025-08-15 10:00:00 +0900
    categories: tech # You can list one or more categories
    tags:
      - Jekyll
      - "Web Development"
      - "Getting Started"
    ---

    (Your post content, written in Markdown, goes here...)
    ```

    *   **`layout`**: Should always be `post`.
    *   **`title`**: The title of your post.
    *   **`date`**: The publication date and time.
    *   **`categories`**: The main category of the post.
    *   **`tags`**: Specific keywords for the post. If a tag contains spaces, enclose it in quotes.

### How to Manage "Studies" and "Projects"

The "Studies" and "Projects" sections are managed as **collections**. This makes them easy to organize.

*   **To add a new Study page:** Create a new `.md` file in the `_studies` directory.
*   **To add a new Project page:** Create a new `.md` file in the `_projects` directory.

Each file should have simple Front Matter like this:

```yaml
---
layout: page
title: "Title of Your Study/Project"
---

(Content goes here...)
```

---

## ⚙️ Site Configuration

Most global settings for the site are located in the `_config.yml` file. This includes:

*   `title`: The title of your blog.
*   `author`: Your name.
*   `email`: Your contact email.
*   `github_username`: Your GitHub username for social links.
*   `disqus.shortname`: Your Disqus shortname to enable comments. Leave it blank to disable them.

Any changes to `_config.yml` require you to restart the Jekyll server to take effect.