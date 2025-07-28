---
layout: page
title: Tags
permalink: /tags/
---

<div class="post-list">
  {% assign tags = site.tags | sort %}
  {% for tag in tags %}
    <h2 id="{{ tag[0] | slugify }}">{{ tag[0] | capitalize }} ({{ tag[1].size }})</h2>
    <ul>
      {% for post in tag[1] %}
        <li>
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          <span class="post-meta" style="margin-left: 10px;"> - {{ post.date | date: "%b %-d, %Y" }}</span>
        </li>
      {% endfor %}
    </ul>
  {% endfor %}
</div>
