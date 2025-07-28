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

3.  **Build the site (if needed):**
    After making significant configuration changes (e.g., `_config.yml`), or if you encounter issues with `jekyll serve`, you might need to explicitly build the site first.
    ```bash
    bundle exec jekyll build
    ```

4.  **Run the local server:**
    This command will build the site (if not already built) and start a local server at `http://localhost:4000`. The site will automatically rebuild when you make changes to the files.
    ```bash
    bundle exec jekyll serve --port 4000
    ```

---

## ✍️ Content Management

This blog is designed for easy content creation and management.

**For a comprehensive guide on how to write posts, studies, projects, and how to add images, please see the [Content Management Guide Post](./_posts/2025-07-28-how-to-write-on-this-blog.md).**

The sections below provide a quick reference.

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

    *   **`layout`**: Should always be `post`. (This is now automatically applied via `_config.yml` for `_posts`.)
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

---

## ✨ Version Management

This site displays the latest Git commit ID in the footer to indicate the current version of the deployed code. This is managed by the `_data/version.yml` file.

### How it Works

The `_data/version.yml` file contains a `commit_id` field. The `_includes/footer.html` file reads this `commit_id` and displays it.

### Updating the Version (Commit ID & Version Number)

To update both the Git commit ID and the human-readable version number (e.g., `v1.3`) in the footer, use the `update_version.sh` script:

```bash
./update_version.sh "X.Y"
```

Replace `"X.Y"` with your desired version number (e.g., `"1.3"`).

This script automatically performs the following:

1.  Fetches the short hash of the latest Git commit and updates the `commit_id` in `_data/version.yml`.
2.  Updates the version number (e.g., `v1.0` to `v1.3`) in `_includes/footer.html`.

**Important:**

*   Run this script **before** building your site (`bundle exec jekyll build`) or serving it locally (`bundle exec jekyll serve`) to ensure the version displayed is up-to-date.
*   If you want the latest version to be reflected in your deployed site, make sure to run this script and commit the updated `_data/version.yml` and `_includes/footer.html` files before pushing your changes.

---

## 🖥️ Managing the Local Server

Here’s how to start and stop the local server for previewing your site.

### Starting the Server (Foreground Mode)

This is the standard and recommended way to run the server.

1.  **Run the command:**
    ```bash
    bundle exec jekyll serve
    ```
2.  **Preview the site:** Open your web browser and go to `http://127.0.0.1:4000`.
3.  **Stopping the server:** The server will keep running and occupy your terminal window. To stop it, go back to the terminal window and press **`Ctrl + C`**.

### Starting the Server (Background Mode - Advanced)

If you want to use the terminal for other commands while the server is running, you can start it in the background.

1.  **Run the command with `&`:**
    ```bash
    bundle exec jekyll serve &
    ```
    The `&` at the end tells the terminal to run the process in the background.

2.  **Stopping the background server:**
    Since the server is running in the background, you need to find its Process ID (PID) to stop it.

    *   **Find the PID:**
        ```bash
        ps aux | grep jekyll
        ```
        This will show you a line containing `bundle exec jekyll serve`. The number in the second column is the PID. (Ignore the line that says `grep jekyll`).

    *   **Stop the process using the PID:**
        ```bash
        kill PID_NUMBER
        ```
        Replace `PID_NUMBER` with the actual number you found. For example, if the PID is `78901`, the command would be `kill 78901`. This sends a graceful shutdown signal.
        If that doesn't work, you can force it to stop with:
        ```bash
        kill -9 PID_NUMBER
        ```

    > **💡 Tip: The `grep` command itself!**
    > When you run `ps aux | grep jekyll`, you will almost always see a line containing `grep jekyll`. This is not the server! This is the `grep` command itself, which found itself in the process list. If you only see this line, it means the Jekyll server is **not** running.