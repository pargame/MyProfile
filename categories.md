---
layout: page
title: Categories
permalink: /categories/
---

<div class="post-list">
  {% for category in site.categories %}
    <h2 id="{{ category[0] | slugify }}">{{ category[0] | capitalize }} ({{ category[1].size }})</h2>
    <ul>
      {% for post in category[1] %}
        <li>
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          <span class="post-meta" style="margin-left: 10px;"> - {{ post.date | date: "%b %-d, %Y" }}</span>
        </li>
      {% endfor %}
    </ul>
  {% endfor %}
</div>
