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

  componentDidMount() {
    let {svg, props: {width, height}} = this;
    svg.attr('width', width)
      .attr('height', height);
  }

  render() {
    let {faux, svg, props: {width, height, users}, getChartData} = this;

    let ch = getChartData(users),
      color = d3.scaleLinear().domain(ch.domainY).range(['red', 'blue']),
      y = d3.scaleLinear().domain(ch.domainY).range([0, height]),
      x = d3.scaleBand().domain(ch.domainX).range([0, width]).round(true);

    svg.selectAll('bar')
      .data(ch.data)
      .enter().append('rect')
      .style('fill', 'steelblue')
      .attr('x', function(d) { return x(d.age); })
      .attr('y', 300)
      .attr('width', x.bandwidth())
      .attr('height', function(d) { return y(d.value); });

    return (<div>{faux.toReact()}</div>)
  }

  getChartData = (users) => {
    let grouped = _.groupBy(users, (u) => (u.age)),
      domainX = Object.keys(grouped).map((k) => (+k)),
      data = domainX.map((i) => ({age: +i, value: grouped[i].length})),
      domainY = data.map((i) => (i.value));
    return {domainX, domainY, data}
  };

  static defaultProps = {
    users: [],
    width: 100,
    height: 100
  };

}

export
default
UsersAgeChartComponent;
