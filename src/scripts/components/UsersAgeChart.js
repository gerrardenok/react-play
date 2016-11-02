import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import Faux from 'react-faux-dom'

class UsersAgeChartComponent extends React.Component {

  constructor(props) {
    super(props);
    this.faux = Faux.createElement('div');
    this.svg = d3.select(this.faux).append('svg');
  }

  render() {
    let {faux, svg, props: {width, height, users}, getChartData} = this;

    let margin = {top: 20, right: 20, bottom: 30, left: 40},
      w = width - margin.left - margin.right,
      h = height - margin.top - margin.bottom;

    svg.selectAll('*').remove(); // on clear old data on each re-render

    svg.attr('width', width)
      .attr('height', height);

    let {data, domainX, domainY} = getChartData(users),
      x = d3.scaleBand().range([0, w]).padding(0.1),
      y = d3.scaleLinear().range([h, 0]);

    x.domain(domainX);
    y.domain(domainY);

    let xAxis = d3.axisBottom(x),
        yAxis = d3.axisLeft(y)
          .tickFormat(d3.format('d'))
          .ticks(5);

    svg = svg
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg.selectAll('.bar')
      .data(data)
      .enter()
        .append('rect')
        .style('fill', 'steelblue')
        .attr('x', (d) => (x(d.age)))
        .attr('y', (d) => (y(d.value)))
        .attr('width', x.bandwidth())
        .attr('height', (d) => (h-y(d.value)));

    svg.append('g')
      .attr('transform', 'translate(0,' + h + ')')
      .call(xAxis);

    svg.append('g')
      .call(yAxis);

    return (<div>{faux.toReact()}</div>)
  }

  getChartData = (users) => {
    let grouped = _.groupBy(users, (u) => (u.age)),
      domainX = Object.keys(grouped).map((k) => (+k)),
      data = domainX.map((i) => ({age: +i, value: grouped[i].length})),
      domainY = [0, d3.max(data.map((i) => (i.value)))];
    return {domainX, domainY, data}
  };

  static defaultProps = {
    users: [],
    width: 100,
    height: 100
  };

}

export default UsersAgeChartComponent;
