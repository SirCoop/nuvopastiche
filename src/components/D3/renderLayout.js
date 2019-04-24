const renderLayout = (function () {
// some colour variables
  const tcBlack = '#130C0E';

  // rest of vars
  const w = 960;
  const h = 800;
  const maxNodeSize = 50;
  const x_browser = 20;
  const y_browser = 25;
  let root;

  let vis;
  const force = d3.layout.force();

  vis = d3.select('#vis').append('svg').attr('width', w).attr('height', h);

  d3.json('marvel.json', (json) => {
    root = json;
    root.fixed = true;
    root.x = w / 2;
    root.y = h / 4;


    // Build the path
    const defs = vis.insert('svg:defs')
      .data(['end']);


    defs.enter().append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5');

    update();
  });


  /**
 *
 */
  function update() {
    const nodes = flatten(root);
    const links = d3.layout.tree().links(nodes);

    // Restart the force layout.
    force.nodes(nodes)
      .links(links)
      .gravity(0.05)
      .charge(-1500)
      .linkDistance(100)
      .friction(0.5)
      .linkStrength((l, i) => { return 1; })
      .size([w, h])
      .on('tick', tick)
      .start();

    let path = vis.selectAll('path.link')
      .data(links, (d) => { return d.target.id; });

    path.enter().insert('svg:path')
      .attr('class', 'link')
      // .attr("marker-end", "url(#end)")
      .style('stroke', '#eee');


    // Exit any old paths.
    path.exit().remove();


    // Update the nodes…
    let node = vis.selectAll('g.node')
      .data(nodes, (d) => { return d.id; });


    // Enter any new nodes.
    const nodeEnter = node.enter().append('svg:g')
      .attr('class', 'node')
      .attr('transform', (d) => { return `translate(${d.x},${d.y})`; })
      .on('click', click)
      .call(force.drag);

    // Append a circle
    nodeEnter.append('svg:circle')
      .attr('r', (d) => { return Math.sqrt(d.size) / 10 || 4.5; })
      .style('fill', '#eee');


    // Append images
    const images = nodeEnter.append('svg:image')
      .attr('xlink:href', (d) => { return d.img; })
      .attr('x', (d) => { return -25; })
      .attr('y', (d) => { return -25; })
      .attr('height', 50)
      .attr('width', 50);

    // make the image grow a little on mouse over and add the text details on click
    const setEvents = images
    // Append hero text
      .on('click', (d) => {
        d3.select('h1').html(d.hero);
        d3.select('h2').html(d.name);
        d3.select('h3').html(`${'Take me to ' + "<a href='"}${d.link}' >${d.hero} web page ⇢` + '</a>');
      })

      .on('mouseenter', function () {
        // select element in current context
        d3.select(this)
          .transition()
          .attr('x', (d) => { return -60; })
          .attr('y', (d) => { return -60; })
          .attr('height', 100)
          .attr('width', 100);
      })
    // set back
      .on('mouseleave', function () {
        d3.select(this)
          .transition()
          .attr('x', (d) => { return -25; })
          .attr('y', (d) => { return -25; })
          .attr('height', 50)
          .attr('width', 50);
      });

    // Append hero name on roll over next to the node as well
    nodeEnter.append('text')
      .attr('class', 'nodetext')
      .attr('x', x_browser)
      .attr('y', y_browser + 15)
      .attr('fill', tcBlack)
      .text((d) => { return d.hero; });


    // Exit any old nodes.
    node.exit().remove();


    // Re-select for update.
    path = vis.selectAll('path.link');
    node = vis.selectAll('g.node');

    function tick() {
      path.attr('d', (d) => {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dr = Math.sqrt(dx * dx + dy * dy);
        return `M${d.source.x},${
          d.source.y
        }A${dr},${
          dr} 0 0,1 ${
          d.target.x},${
          d.target.y}`;
      });
      node.attr('transform', nodeTransform);
    }
  }


  /**
 * Gives the coordinates of the border for keeping the nodes inside a frame
 * http://bl.ocks.org/mbostock/1129492
 */
  function nodeTransform(d) {
    d.x = Math.max(maxNodeSize, Math.min(w - (d.imgwidth / 2 || 16), d.x));
    d.y = Math.max(maxNodeSize, Math.min(h - (d.imgheight / 2 || 16), d.y));
    return `translate(${d.x},${d.y})`;
  }

  /**
 * Toggle children on click.
 */
  function click(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }

    update();
  }


  /**
 * Returns a list of all nodes under the root.
 */
  function flatten(root) {
    const nodes = [];
    let i = 0;

    function recurse(node) {
      if (node.children) { node.children.forEach(recurse); }
      if (!node.id) { node.id = ++i; }
      nodes.push(node);
    }

    recurse(root);
    return nodes;
  }
}());
