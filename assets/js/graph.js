/* global d3 */
(function () {
    // Fetch data from generated endpoint, then bootstrap UI
    async function fetchData() {
        // Fetch relative to current page to support baseurl
        const url = new URL('data.json', window.location.href).toString();
        const resp = await fetch(url, { credentials: 'same-origin', cache: 'force-cache' });
        if (!resp.ok) throw new Error('Failed to load data.json');
        return resp.json();
    }

    function getNodeColor(node) {
        const colors = {
            articles: '#e74c3c',
            studies: '#3498db',
            projects: '#2ecc71',
            obsidian: '#9b59b6',
            other: '#95a5a6'
        };
        return colors[node.collection] || colors.other;
    }

    function getClampedValue(element) {
        const value = parseFloat(element.value);
        const min = parseFloat(element.min);
        const max = parseFloat(element.max);
        return Math.max(min, Math.min(max, value));
    }

    function generateNodesAndEdges(data) {
        const nodes = [];
        const edges = [];

        for (const url in data.documents) {
            const doc = data.documents[url];
            nodes.push({
                id: url,
                label: doc.title || url.split('/').pop(),
                title: doc.title || url.split('/').pop(),
                collection: doc.collection || 'other',
                archive: doc.archive || 'Root',
                degree: 0
            });
        }

        for (const url in data.documents) {
            const doc = data.documents[url];
            const links = Array.isArray(doc.links) ? doc.links : [];
            links.forEach(targetUrl => {
                if (targetUrl && targetUrl !== url && data.documents[targetUrl]) {
                    edges.push({ from: url, to: targetUrl, type: 'internal' });
                }
            });
        }

        return { nodes, edges };
    }

    document.addEventListener('DOMContentLoaded', async function () {
        const archiveSelector = document.getElementById('archive-selector');
        const docList = document.getElementById('document-list');
        const docContent = document.getElementById('document-content');
        const graphDiagram = document.getElementById('graph-diagram');
        const graphControls = document.getElementById('graph-controls');
        const nodeSizeInput = document.getElementById('node-size-input');
        const chargeStrengthInput = document.getElementById('charge-strength-input');
        const regenButton = document.getElementById('regen-button');

        let simulation;
        let currentNodes = [];
        let currentEdges = [];
        let allData = { archives: [], documents: {} };

        // Simple cache to avoid refetching content repeatedly
        const contentCache = new Map();

        function drawGraph(nodes, edges) {
            graphDiagram.innerHTML = '';
            const width = graphDiagram.clientWidth;
            const height = graphDiagram.clientHeight;

            if (width === 0 || height === 0) {
                graphDiagram.innerHTML = '<p>Graph area is too small.</p>';
                return;
            }

            const svg = d3.select(graphDiagram).append('svg')
                .attr('width', width)
                .attr('height', height)
                .call(d3.zoom()
                    .scaleExtent([0.1, 3])
                    .on('zoom', (event) => {
                        container.attr('transform', event.transform);
                    }));

            const container = svg.append('g');

            const nodeMap = new Map(nodes.map(node => [node.id, node]));
            const links = edges.map(edge => ({
                source: nodeMap.get(edge.from),
                target: nodeMap.get(edge.to)
            })).filter(l => l.source && l.target);

            const degrees = new Map();
            nodes.forEach(node => degrees.set(node.id, 0));
            links.forEach(link => {
                const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
                const targetId = typeof link.target === 'object' ? link.target.id : link.target;
                degrees.set(sourceId, (degrees.get(sourceId) || 0) + 1);
                degrees.set(targetId, (degrees.get(targetId) || 0) + 1);
            });
            nodes.forEach(node => { node.degree = degrees.get(node.id) || 0; });

            const sizeScale = d3.scaleSqrt()
                .domain(d3.extent(nodes, d => d.degree))
                .range([8, getClampedValue(nodeSizeInput)]);

            simulation = d3.forceSimulation(nodes)
                .force('link', d3.forceLink(links).id(d => d.id).distance(100).strength(0.3))
                .force('charge', d3.forceManyBody().strength(getClampedValue(chargeStrengthInput)).distanceMax(400))
                .force('center', d3.forceCenter(width / 2, height / 2))
                .force('collision', d3.forceCollide().radius(d => sizeScale(d.degree) + 5));

            const link = container.append('g')
                .attr('class', 'links')
                .selectAll('line')
                .data(links)
                .enter().append('line')
                .attr('stroke', '#666')
                .attr('stroke-opacity', 0.6)
                .attr('stroke-width', 1.5);

            const node = container.append('g')
                .attr('class', 'nodes')
                .selectAll('g')
                .data(nodes)
                .enter().append('g')
                .attr('class', 'node')
                .call(d3.drag()
                    .on('start', dragstarted)
                    .on('drag', dragged)
                    .on('end', dragended));

            const circles = node.append('circle')
                .attr('r', d => sizeScale(d.degree))
                .attr('fill', d => getNodeColor(d))
                .attr('stroke', '#fff')
                .attr('stroke-width', 2)
                .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))')
                .on('mouseover', showTooltip)
                .on('mouseout', hideTooltip)
                .on('click', selectNode);

            const labels = node.append('text')
                .text(d => d.label.length > 15 ? d.label.substring(0, 15) + '...' : d.label)
                .attr('dy', d => sizeScale(d.degree) + 16)
                .attr('text-anchor', 'middle')
                .style('font-size', '12px')
                .style('font-weight', '500')
                .style('fill', '#333')
                .style('pointer-events', 'none');

            simulation.on('tick', () => {
                link
                    .attr('x1', d => d.source.x)
                    .attr('y1', d => d.source.y)
                    .attr('x2', d => d.target.x)
                    .attr('y2', d => d.target.y);

                node.attr('transform', d => `translate(${d.x},${d.y})`);
            });

            setTimeout(() => simulation.stop(), 8000);

            function dragstarted(event, d) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }
            function dragged(event, d) {
                d.fx = event.x;
                d.fy = event.y;
            }
            function dragended(event, d) {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }

            function showTooltip(event, d) {
                const tooltip = d3.select('body').append('div')
                    .attr('class', 'graph-tooltip')
                    .style('opacity', 0)
                    .style('position', 'absolute')
                    .style('background', 'rgba(0,0,0,0.8)')
                    .style('color', 'white')
                    .style('padding', '10px')
                    .style('border-radius', '5px')
                    .style('font-size', '14px')
                    .style('pointer-events', 'none')
                    .style('z-index', '1000');

                tooltip.html(`
            <strong>${d.title}</strong><br>
            Collection: ${d.collection}<br>
            Connections: ${d.degree}
        `)
                    .style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 10) + 'px')
                    .transition()
                    .duration(200)
                    .style('opacity', 1);
            }

            function hideTooltip() {
                d3.selectAll('.graph-tooltip').remove();
            }

            function highlightConnections(nodeData) {
                link.attr('stroke-opacity', 0.1).attr('stroke-width', 1);
                circles.attr('fill-opacity', 0.3);
                const connectedNodes = new Set([nodeData.id]);
                links.forEach(l => {
                    const s = typeof l.source === 'object' ? l.source.id : l.source;
                    const t = typeof l.target === 'object' ? l.target.id : l.target;
                    if (s === nodeData.id || t === nodeData.id) {
                        connectedNodes.add(s);
                        connectedNodes.add(t);
                    }
                });
                link.filter(l => {
                    const s = typeof l.source === 'object' ? l.source.id : l.source;
                    const t = typeof l.target === 'object' ? l.target.id : l.target;
                    return s === nodeData.id || t === nodeData.id;
                })
                    .attr('stroke-opacity', 1)
                    .attr('stroke-width', 3)
                    .attr('stroke', '#ff6b35');
                circles.filter(d => connectedNodes.has(d.id)).attr('fill-opacity', 1);
            }

            function selectNode(event, d) {
                d3.selectAll('.node circle').attr('stroke', '#fff').attr('stroke-width', 2);
                d3.select(event.currentTarget).attr('stroke', '#ff6b35').attr('stroke-width', 4);
                highlightConnections(d);
                renderDocumentContent(d.id);
            }

            function updateForces() {
                if (!simulation) return;
                const newSizeScale = d3.scaleSqrt()
                    .domain(d3.extent(simulation.nodes(), d => d.degree))
                    .range([8, getClampedValue(nodeSizeInput)]);
                circles.attr('r', d => newSizeScale(d.degree));
                labels.attr('dy', d => newSizeScale(d.degree) + 16)
                    .style('font-size', d => `${Math.max(8, newSizeScale(d.degree) / 2)}px`);
                simulation.force('collision').radius(d => newSizeScale(d.degree) + 5);
                simulation.force('charge').strength(getClampedValue(chargeStrengthInput));
                simulation.alpha(0.3).restart();
            }

            nodeSizeInput.oninput = updateForces;
            chargeStrengthInput.oninput = updateForces;

            svg.on('click', (event) => {
                if (event.target === svg.node()) {
                    d3.selectAll('.node circle').attr('stroke', '#fff').attr('stroke-width', 2).attr('fill-opacity', 1);
                    link.attr('stroke-opacity', 0.6).attr('stroke-width', 1.5).attr('stroke', '#666');
                }
            });
        }

        function renderDocumentContent(selectedUrl) {
            if (!selectedUrl || !allData.documents[selectedUrl]) {
                docContent.innerHTML = '<p>Please select a document.</p>';
                return;
            }
            const doc = allData.documents[selectedUrl];
            docContent.innerHTML = `
        <div class="document-header">
          <h2>${doc.title || 'Untitled'}</h2>
          <div class="document-meta">
            <span class="collection-badge collection-${doc.collection}">${doc.collection || 'other'}</span>
          </div>
        </div>
        <div class="document-body"><p>Loading…</p></div>
      `;
            const bodyEl = docContent.querySelector('.document-body');
            if (contentCache.has(selectedUrl)) {
                bodyEl.innerHTML = contentCache.get(selectedUrl);
                wireInternalLinks();
                return;
            }
            fetch(doc.url, { credentials: 'same-origin' })
                .then(resp => resp.text())
                .then(html => {
                    const parser = new DOMParser();
                    const docHtml = parser.parseFromString(html, 'text/html');
                    const content = docHtml.querySelector('.post-content');
                    const extracted = content ? content.innerHTML : '<p>Content unavailable.</p>';
                    contentCache.set(selectedUrl, extracted);
                    bodyEl.innerHTML = extracted;
                    wireInternalLinks();
                })
                .catch(() => {
                    bodyEl.innerHTML = '<p>Failed to load content. <a href="' + doc.url + '" target="_blank" rel="noopener">Open in new tab</a></p>';
                });

            function wireInternalLinks() {
                const links = docContent.querySelectorAll('.document-body a[href]');
                links.forEach(link => {
                    const href = link.getAttribute('href') || '';
                    if (href.startsWith('http') || href.startsWith('#')) return;
                    let targetHref = href;
                    try {
                        const urlObj = new URL(href, window.location.origin);
                        targetHref = urlObj.pathname.endsWith('/') ? urlObj.pathname : urlObj.pathname + '/';
                    } catch (_) { /* ignore */ }
                    if (allData.documents[targetHref]) {
                        link.addEventListener('click', (e) => {
                            e.preventDefault();
                            renderDocumentContent(targetHref);
                        });
                    }
                });
            }
        }

        function updateArchiveList() {
            const selectedArchive = document.querySelector('.archive-button.active')?.dataset.archive || 'all';
            let workingData = allData;
            if (selectedArchive !== 'all') {
                workingData = { documents: {} };
                for (const url in allData.documents) {
                    const doc = allData.documents[url];
                    if (doc.archive === selectedArchive) {
                        workingData.documents[url] = doc;
                    }
                }
            }
            const generated = generateNodesAndEdges(workingData);
            currentNodes = generated.nodes;
            currentEdges = generated.edges;

            docList.innerHTML = '<h3>Documents</h3><ul></ul>';
            const ul = docList.querySelector('ul');
            currentNodes.forEach(node => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = '#';
                a.textContent = node.title;
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    renderDocumentContent(node.id);
                    docList.querySelectorAll('a').forEach(link => link.classList.remove('selected'));
                    a.classList.add('selected');
                });
                li.appendChild(a);
                ul.appendChild(li);
            });

            drawGraph(currentNodes, currentEdges);
            graphControls.style.display = currentNodes.length > 0 ? 'flex' : 'none';
        }

        function initializeArchiveSelector() {
            archiveSelector.innerHTML = '<label>Select Archive:</label>';
            const allButton = document.createElement('button');
            allButton.className = 'archive-button active';
            allButton.dataset.archive = 'all';
            allButton.textContent = 'all';
            allButton.addEventListener('click', () => {
                document.querySelectorAll('.archive-button').forEach(btn => btn.classList.remove('active'));
                allButton.classList.add('active');
                updateArchiveList();
            });
            archiveSelector.appendChild(allButton);
            allData.archives.forEach(archive => {
                const button = document.createElement('button');
                button.className = 'archive-button';
                button.dataset.archive = archive;
                button.textContent = archive;
                button.addEventListener('click', () => {
                    document.querySelectorAll('.archive-button').forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    updateArchiveList();
                });
                archiveSelector.appendChild(button);
            });
        }

        function showError(msg) {
            graphDiagram.innerHTML = `<p style="color:#ff8a80">${msg}</p>`;
        }

        try {
            allData = await fetchData();
            initializeArchiveSelector();
            updateArchiveList();
        } catch (e) {
            showError('Failed to load graph data. Build the site and ensure /graph/data.json exists.');
            // Fallback: try to infer base and display hint
        }

        regenButton.addEventListener('click', () => {
            if (simulation) {
                simulation.alpha(1).restart();
                setTimeout(() => simulation.stop(), 8000);
            }
        });
    });
})();
