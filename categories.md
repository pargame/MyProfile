---
layout: page
title: Categories
permalink: /categories/
---

{% assign posts_with_categories = site.articles | where_exp: "item", "item.categories != nil" %}
<div class="post-list">
  {% assign categories = posts_with_categories | map: "categories" | uniq | sort %}
  {% for category in categories %}
    {% if category %}
      <h2 id="{{ category | slugify }}">{{ category | capitalize }}</h2>
      <ul>
        {% for post in posts_with_categories %}
          {% if post.categories contains category %}
            <li>
              <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
              <span class="post-meta" style="margin-left: 10px;"> - {{ post.date | date: "%b %-d, %Y" }}</span>
            </li>
          {% endif %}
        {% endfor %}
      </ul>
    {% endif %}
  {% endfor %}
</div>
