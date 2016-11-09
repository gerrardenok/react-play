import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

class UsersAgeLineChartComponent extends React.Component {

  render() {
    if (this.props.users && this.props.users.length)
      return (
        <div className="users-line-chart-container">
          <div className="users-line-chart" ref={this.initChart}/>
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

    this.x = d3.scaleBand().padding(0.1);
    this.y = d3.scaleLinear();

    this.xAxis = d3.axisBottom(this.x);
    this.yAxis = d3.axisLeft(this.y)
      .tickFormat(d3.format('.0f'));

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
    let {el, svg, tooltip, props: {users}} = this;

    if (!el) return;

    let margin = {top: 20, right: 20, bottom: 40, left: 20},
      pointsSize = 5,
      container = el.getBoundingClientRect(),
      width = container.width - margin.left - margin.right,
      height = container.height - margin.top - margin.bottom;

    svg.selectAll('*').remove(); // on clear old data on each re-render

    svg.attr('width', container.width)
      .attr('height', container.height);

    let {data, domainX, domainY} = UsersAgeLineChartComponent.getChartData(users),
      x = d3.scaleTime().range([margin.left + pointsSize, width]),
      y = d3.scaleLinear().range([height, 0]);

    x.domain(domainX);
    y.domain(domainY);

    let xAxis = d3.axisBottom(x),
      yAxis = d3.axisLeft(y)
        .ticks(d3.max(domainY))
        .tickFormat(d3.format('.0f'));

    svg = svg
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    let line = d3.line()
      .y((d) => y(d.count))
      .x((d) => x(d.date));

    svg.append('path')
      .data([data])
      .attr('class', 'line')
      .attr('d', line);

    let points = svg.selectAll('circle.line-point')
      .data(data)
      .enter().append('circle')
        .attr('class', 'line-point')
        .attr('cy', (d) => y(d.count))
        .attr('cx', (d) => x(d.date))
        .on('mouseover', mouseOver)
        .on('mouseout', () => {
          tooltip.style('visibility', 'hidden')
        });

    if(needTransition) {
      points = points.attr('r', 0).transition()
    }
    points.attr('r', pointsSize);

    // Append x axis
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);
    svg.append('text')
      .attr('text-anchor', 'middle')  // this makes it easy to centre the text as the transform is applied to the anchor
      .attr('transform', 'translate('+ (width/2) +','+(height + margin.bottom - 10)+')')  // centre below axis
      .text('Year');

    // Append y axis
    svg.append('g')
      .attr('transform', 'translate('+ margin.left + ',0)')
      .call(yAxis);
    svg.append('text')
      .attr('text-anchor', 'middle')  // this makes it easy to centre the text as the transform is applied to the anchor
      .attr('transform', 'translate(0,'+(height/2)+')rotate(-90)')  // text is drawn off the screen top left, move down and out and rotate
      .text('Users Count');

    function mouseOver(d) {
      let cx = x(d.date),
        cy = y(d.count),
        {height} = tooltip.node().getBoundingClientRect();

      tooltip.style('visibility', 'visible');
      tooltip
        .style('left', cx + 'px')
        .style('top', cy - height + 'px')
        .html(`Year: ${d.date.getFullYear()} <br/> Users: ${d.count}`);
    }

  };

  static getChartData(users) {
    let grouped = _.groupBy(users, (u) => (u.age)),
      list = Object.keys(grouped).map((k) => (+k)),
      data = list.map((i) => {
        var date = new Date();
        date.setYear(date.getYear() - i);
        return {
          count: grouped[i].length,
          date
        }
      }),
      domainY = [0, d3.max(data, (d) => (d.count))],
      domainX = d3.extent(data, (d) => (d.date));
      return {domainX, domainY, data}
  }

}

export default UsersAgeLineChartComponent;
