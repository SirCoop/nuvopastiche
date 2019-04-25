/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {},
});

class ForceLayout extends React.Component {
  // some colour variables
  tcBlack = '#130C0E';

  // rest of vars
  w = '';

  h = '';

  maxNodeSize = 50;

  xBrowser = 20;

  yBrowser = 25;

  root = '';

  defs = '';

  force = '';

  vis = '';

  path = '';

  node = '';

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    const { height, width } = this.props;
    this.h = height;
    this.w = width;
    this.force = d3.layout.force();
    this.vis = d3.select('#vis').append('svg').attr('width', this.w).attr('height', this.h);
    this.loadImages();
  }

  loadImages = () => {
    const { data } = this.props;
    this.root = data;
    this.root.fixed = true;
    this.root.x = this.w / 2;
    this.root.y = this.h / 4;

    // Build the path
    this.defs = this.vis.insert('svg:defs').data(['end']);
    this.defs.enter().append('svg:path').attr('d', 'M0,-5L10,0L0,5');
    this.update();
  }

  update = () => {
    const nodes = this.flatten(this.root);
    const links = d3.layout.tree().links(nodes);

    // Restart the force layout.
    this.force.nodes(nodes)
      .links(links)
      .gravity(0.05)
      .charge(-1500)
      .linkDistance(100)
      .friction(0.5)
      .linkStrength((l, i) => 1)
      .size([this.w, this.h])
      .on('tick', this.tick)
      .start();

    this.path = this.vis.selectAll('path.link')
      .data(links, d => d.target.id);

    this.path.enter().insert('svg:path')
      .attr('class', 'link')
      // .attr('marker-end', 'url(#end)')
      .style('stroke', '#eee');

    // Exit any old paths.
    this.path.exit().remove();

    // Update the nodes…
    this.node = this.vis.selectAll('g.node')
      .data(nodes, d => d.id);

    // Enter any new nodes.
    const nodeEnter = this.node.enter().append('svg:g')
      .attr('class', 'node')
      .attr('transform', (d) => { return `translate(${d.x},${d.y})`; })
      .on('click', this.click)
      .call(this.force.drag);

    // Append a circle
    nodeEnter.append('svg:circle')
      .attr('r', d => (Math.sqrt(d.size) / 10) || 4.5)
      .style('fill', '#eee');

    // Append images
    const images = nodeEnter.append('svg:image')
      .attr('xlink:href', d => d.img)
      .attr('x', d => -25)
      .attr('y', d => -25)
      .attr('height', 100)
      .attr('width', 100)
      .attr('id', d => `${d.elName}-${d.id}`);

    // Append hero text
    images.on('click', (d) => {
      console.log('d: ', d);
      // d3.select('h1').html(d.hero);
      // d3.select('h2').html(d.name);
      // d3.select('h3').html(`Take me to ' + '<a href='' + ${d.link} + '' >'  + ${d.hero} + ' web page ⇢'+ '</a>`);
    });

    // make the image grow a little on mouse over and add the text details on click
    images.on('mouseenter', (d) => {
      // select element in current context
      const image = d3.select(`#${d.elName}-${d.id}`);
      // select needs a reference to this dom element, not the image object
      image
        .transition()
        .attr('x', d => -60)
        .attr('y', d => -60)
        .attr('height', 200)
        .attr('width', 200);
    });
    // set back
    images.on('mouseleave', (d) => {
      const image = d3.select(`#${d.elName}-${d.id}`);
      image
        .transition()
        .attr('x', d => -25)
        .attr('y', d => -25)
        .attr('height', 100)
        .attr('width', 100);
    });

    // Append hero name on roll over next to the node as well
    nodeEnter.append('text')
      .attr('class', 'nodetext')
      .attr('x', this.xBrowser)
      .attr('y', this.yBrowser + 15)
      .attr('fill', this.tcBlack)
      .text(d => d.hero);

    // Exit any old nodes.
    this.node.exit().remove();

    // Re-select for update.
    this.path = this.vis.selectAll('path.link');
    this.node = this.vis.selectAll('g.node');
  };

  tick = () => {
    this.path.attr('d', (d) => {
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
    this.node.attr('transform', this.nodeTransform);
  };

  /**
   * Gives the coordinates of the border for keeping the nodes inside a frame
   * http://bl.ocks.org/mbostock/1129492
  */
  nodeTransform = (d) => {
    d.x = Math.max(this.maxNodeSize, Math.min(this.w - ((d.imgwidth / 2) || 16), d.x));
    d.y = Math.max(this.maxNodeSize, Math.min(this.h - ((d.imgheight / 2) || 16), d.y));
    return `translate(${d.x},${d.y})`;
  };

  /**
   * Toggle children on click.
  */
  click = (d) => {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    this.update();
  };

  /**
   * Returns a list of all nodes under the root.
  */
  flatten = (root) => {
    const nodes = [];
    let i = 0;

    const recurse = (node) => {
      if (node.children) { node.children.forEach(recurse); }
      if (!node.id) { node.id = ++i; }
      nodes.push(node);
    };

    recurse(root);
    return nodes;
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <section id="vis" />
      </div>
    );
  }
}

ForceLayout.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({}).isRequired,
  height: PropTypes.number.isRequired,
  theme: PropTypes.shape({}),
  width: PropTypes.number.isRequired,
};

ForceLayout.propTypes = {
  classes: PropTypes.shape({}),
  data: PropTypes.shape({}),
  height: PropTypes.number,
  theme: PropTypes.shape({}),
  width: PropTypes.number,
};

export default withStyles(styles, { withTheme: true })(ForceLayout);
