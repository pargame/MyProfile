---
title: Studies
layout: page
---

### 주제별 학습 기록

{%- assign docs = site.studies | sort: "title" -%}
{%- assign groups = "" -%}
{%- for doc in docs -%}
  {%- assign path_parts = doc.path | remove_first: "_studies/" | split: "/" -%}
  {%- assign group_name = path_parts.first -%}
  {%- assign groups = groups | append: group_name | append: "," -%}
{%- endfor -%}
{%- assign unique_groups = groups | split: "," | uniq | sort -%}

{% for group_name in unique_groups %}
  {%- if group_name == "" -%}{%- continue -%}{%- endif -%}
  <details open>
    <summary>{{ group_name }}</summary>
    <ul class="post-list">
      {%- for doc in docs -%}
        {%- assign path_parts = doc.path | remove_first: "_studies/" | split: "/" -%}
        {%- assign doc_group = path_parts.first -%}
        {%- if doc_group == group_name -%}
        <li>
          <h4>
            <a class="post-link" href="{{ doc.url | relative_url }}">
              {{ doc.title }}
            </a>
          </h4>
          {%- if doc.author -%}
            <span class="post-meta">by {{ doc.author }}</span>
          {%- endif -%}
          <p>{{ doc.content | strip_html | truncatewords: 30 }}</p>
        </li>
        {%- endif -%}
      {%- endfor -%}
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