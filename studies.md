---
title: Studies
layout: page
---

### 주제별 학습 기록

{% assign grouped_studies = site.studies | group_by: "In" | sort: "name" %}

{% for group in grouped_studies %}
  {% assign group_name = group.name | default: "기타" %}
  <details>
    <summary>{{ group_name }}</summary>
    <ul class="post-list">
      {% assign items_sorted = group.items | sort: "title" %}
      {% for item in items_sorted %}
        <li>
          <h4>
            <a class="post-link" href="{{ item.url | relative_url }}">
              {{ item.title }}
            </a>
          </h4>
          {%- if item.author -%}
            <span class="post-meta">by {{ item.author }}</span>
          {%- endif -%}
          <p>{{ item.content | strip_html | truncatewords: 50 }}</p>
        </li>
      {% endfor %}
    </ul>
  </details>
{% endfor %}

<style>
  details {
    border: 1px solid #333;
    border-radius: 4px;
    padding: 0.5em 0.5em 0;
    margin-bottom: 1em;
  }

  summary {
    font-size: 1.25em;
    font-weight: bold;
    margin: -0.5em -0.5em 0;
    padding: 0.5em;
    cursor: pointer;
  }

  details[open] {
    padding: 0.5em;
  }

  details[open] summary {
    border-bottom: 1px solid #333;
    margin-bottom: 0.5em;
  }

  .post-list {
    list-style: none;
    padding-left: 0;
  }

  .post-list li {
    margin-bottom: 1.5em;
  }

  .post-list h4 {
    margin-bottom: 0.2em;
  }

  .post-list p {
    margin-top: 0;
    color: #ccc;
  }
</style>
