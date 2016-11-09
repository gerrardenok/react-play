import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

class UsersAgePieChartComponent extends React.Component {

  render() {
    if (this.props.users && this.props.users.length)
      return (
        <div className="users-pie-chart-container">
          <div className="users-pie-chart" ref={this.initChart}/>
        </div>
      );
    else return (<div />);
  }

  componentDidUpdate() {
    this.renderChart(true);
  }

  initChart = (el) => {
    if (!el) return;

    this.el = el;
    this.svg = d3.select(this.el).append('svg');

    this.color = d3.scaleOrdinal()
      .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', 'steelblue']);

    this.arc = d3.arc()
      .innerRadius(0);

    this.pie = d3.pie()
      .sort(null)
      .value((d) => d.value);

    this.tooltip = d3.select(this.el)
      .append('div')
      .attr('class', 'd3-tooltip')
      .style('visibility', 'hidden');

    this.renderChart(true);

    d3.select(window).on('resize', () => {
      this.renderChart();
    })
  };

  renderChart = (needTransition = false) => {
    let {el, svg, pie, arc, color, tooltip, props: {users}} = this;

    if (!el) return;

    let {width, height} = el.getBoundingClientRect(),
      radius = Math.min(width, height) / 2;

    svg.selectAll('*').remove(); // on clear old data on each re-render

    svg.attr('width', width)
      .attr('height', height);

    arc.outerRadius(radius);

    let {data} = UsersAgePieChartComponent.getChartData(users);

    svg = svg
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    let path = svg.selectAll('.arc')
      .data(pie(data))
      .enter()
        .append('g')
        .attr('class', 'arc')
        .append('path')
        .attr('d', arc)
        .style('fill', function(d) { return color(d.data.age); })
        .on('mouseover', mouseOver)
        .on('mouseout', () => {
          tooltip.style('visibility', 'hidden')
        });

    function mouseOver(d) {
      let [x, y] = arc.centroid(d),
        tc = tooltip.node().getBoundingClientRect();
      tooltip.style('visibility', 'visible');
      tooltip
        .style('left', x + (width / 2) - (tc.width / 2) + 'px')
        .style('top', y + (height / 2) - (tc.height / 2) + 'px')
        .html(`Age: ${d.data.age}` +'\n'+ `Users: ${d.data.value}`);
    }

  };

  static getChartData(users) {
    let grouped = _.groupBy(users, (u) => (u.age)),
      line = Object.keys(grouped).map((k) => (+k)),
      data = line.map((i) => ({age: +i, value: grouped[i].length}));
    return {data}
  }

}

export default UsersAgePieChartComponent;
