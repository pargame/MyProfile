---
layout: page
title: Search
permalink: /search/
---

<div id="search-container">
  <input type="text" id="search-input" placeholder="Search...">
  <ul id="results-container"></ul>
</div>

<script src="https://unpkg.com/simple-jekyll-search@1.10.0/dest/simple-jekyll-search.min.js"></script>
<script>
  var sjs = SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: '{{ "/search.json" | relative_url }}',
    searchResultTemplate: '<li><a href="{url}">{title}</a><span class="search-meta">{date}</span></li>',
    noResultsText: 'No results found',
    limit: 10,
    fuzzy: false
  });
</script>
