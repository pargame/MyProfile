# Pargame's Blog & Knowledge Archive

This repository contains the source for Pargame's personal blog, portfolio, and interconnected knowledge archive, all powered by Jekyll.

## ✨ Core Features & Architecture

*   **Content Hub**: Manages three distinct types of content:
    *   `_articles`: Chronological blog posts.
    *   `_studies` & `_projects`: Structured, topic-based knowledge and project documentation.
    *   `_obsidian`: A Zettelkasten-style knowledge base where concepts are linked together.
*   **Interactive Knowledge Graph**: A key feature of this blog is the **Archive Explorer** (`/graph`), a dynamic, interactive graph built with D3.js. It visually represents the connections between documents in the `_obsidian` collection, allowing for intuitive exploration of the knowledge base.
*   **Simplified Grouping**: Content in `_studies`, `_projects`, and `_obsidian` is automatically grouped based on its directory path (e.g., `_studies/UnrealEngine/` becomes the "UnrealEngine" group).
*   **Automation**: Leverages Jekyll's `collections` and `defaults` to minimize manual configuration.

---

## 🚀 Getting Started: Running Your Own Version

This template is compatible with macOS, Windows, and Linux. Follow these steps to set up a local version.

### 1. Prerequisites

Ensure you have Ruby and Bundler installed. If not, follow the official guide for your operating system.

*   **[Jekyll Installation Guide](https://jekyllrb.com/docs/installation/)**

### 2. Setup and Local Server

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/pargame/MyProfile.git
    cd MyProfile
    ```

2.  **Install dependencies:** This command installs all necessary Jekyll plugins and libraries defined in the `Gemfile`.
    ```bash
    bundle install
    ```

3.  **Run the local preview server:** Use this command to build the site and serve it locally. The server will automatically rebuild the site when you make changes to the content.
    ```bash
    bundle exec jekyll serve
    ```
    *   Once the server is running, open your web browser and navigate to `http://127.0.0.1:4000` to see your blog.
    *   To stop the server, press `Ctrl + C` in your terminal.

### 3. Customization

To make this blog your own, edit the following:

*   **`_config.yml`**: Change `title`, `email`, `description`, `github_username`, etc., to your own information.
*   **`about.md`**: Write your own introduction.
*   **Delete or modify existing content**: Clear out the example files in `_articles`, `_studies`, `_projects`, and `_obsidian` and start creating your own content.

---

## ✍️ Content Creation Guide

This blog supports three main content types.

### 1. Articles (Blog Posts)

For standard, time-sensitive blog posts.

*   **Location**: `_articles/`
*   **Grouping**: Classified by `categories` in the front matter.
*   **Front Matter**:
    ```yaml
    ---
    title: "Title of Your Post"
    date: 2025-08-15 10:00:00 +0900
    categories: Tech
    author: "YourName"
    ---

    (Content goes here...)
    ```

### 2. Studies & Projects (Structured Docs)

For in-depth topics or project documentation.

*   **Location**: `_studies/GroupName/` or `_projects/GroupName/`
*   **Grouping**: Automatically grouped by the sub-folder name (`GroupName`).
*   **Front Matter**:
    ```yaml
    ---
    title: "Title of Your Study or Project"
    author: "YourName"
    ---

    (Content goes here...)
    ```

### 3. Obsidian (Knowledge Archive)

For building a web of connected knowledge, visualized in the Archive Explorer.

*   **Location**: `_obsidian/GroupName/`
*   **Grouping**: Automatically grouped by the sub-folder name (`GroupName`).
*   **Front Matter is Crucial**: Unlike other content, the front matter here directly controls the graph visualization.
    ```yaml
    ---
    title: "The Exact Name of This Node"
    author: "YourName"
    ---

    (Content, including [[links]], goes here...)
    ```
    *   `title`: **This is mandatory.** The text you provide here becomes the **display name for the node** in the interactive graph. It is also the target for links from other documents.
*   **Creating Links**: To create a connection between documents (which becomes an edge in the graph), enclose the **exact `title`** of another document in double square brackets.
    ### 3. Obsidian (Knowledge Archive)

For building a web of connected knowledge, visualized in the Archive Explorer.

*   **Location**: `_obsidian/GroupName/`
*   **Node Label**: The name of each node in the graph is **determined by its filename** (e.g., `UAnimInstance.md` becomes the `UAnimInstance` node).
*   **Front Matter**: You **must** use a minimal, empty front matter (`--- ---`). **Do not add a `title` attribute** or any other content. The system relies on Jekyll automatically generating a title from the filename for other parts of the site, but the graph itself uses the filename.
*   **Creating Links**: To create a connection (an edge in the graph), enclose the **filename (without extension)** of another document in double square brackets.
    *   Example: To link to `UAnimInstance.md`, you must use `[[UAnimInstance]]` in your text.

---

##  troubleshooting

### "Address already in use" Error

If the `serve` command fails with this error, another process is using port `4000`.

*   **macOS / Linux:** Find the process ID (PID) with `lsof -i :4000` and terminate it with `kill -9 [PID]`.
*   **Windows:** Find the PID with `netstat -ano | findstr :4000` and terminate it with `taskkill /F /PID [PID]`.
