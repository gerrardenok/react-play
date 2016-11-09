import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

class UsersAgeChartComponent extends React.Component {

  render() {
    if (this.props.users && this.props.users.length)
      return (
        <div className="users-bar-chart-container">
          <div className="users-bar-chart" ref={this.initChart}/>
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
      container = el.getBoundingClientRect(),
      width = container.width - margin.left - margin.right,
      height = container.height - margin.top - margin.bottom;

    svg.selectAll('*').remove(); // on clear old data on each re-render

    svg.attr('width', container.width)
      .attr('height', container.height);

    let {data, domainX, domainY} = UsersAgeChartComponent.getChartData(users),
      x = d3.scaleBand().range([margin.left, width]).padding(0.1),
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

    let selection = svg.selectAll('.bar')
      .data(data);

    let exit = selection.exit();
    exit.transition()
      .duration(300)
      .attr('height', 0)
      .remove();

    let enter = selection.enter();
    enter.append('rect')
      .attr('class', 'bar')

      .attr('y', (d) => (y(0))) // init y
      .attr('height', 0) // init height

      .attr('x', (d) => (x(d.age)))
      .attr('width', x.bandwidth())
      .on('mouseover', () => {tooltip.style('visibility', 'visible') })
      .on('mouseout', () => { tooltip.style('visibility', 'hidden') })
      .on('mousemove', mouseMove);

    let update = enter
      .merge(selection)
      .selectAll('*'); // TODO: WTF!!!!!

    if (needTransition) {
      update = update.transition()
        .duration(300);
    }

    update
      .attr('y', (d) => (y(d.value)))
      .attr('height', (d) => (height - y(d.value)));

    // Append x axis
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);
    svg.append('text')
      .attr('text-anchor', 'middle')  // this makes it easy to centre the text as the transform is applied to the anchor
      .attr('transform', 'translate('+ (width/2) +','+(height + margin.bottom - 10)+')')  // centre below axis
      .text('Age Groups');

    // Append y axis
    svg.append('g')
      .attr('transform', 'translate('+ margin.left + ',0)')
      .call(yAxis);
    svg.append('text')
      .attr('text-anchor', 'middle')  // this makes it easy to centre the text as the transform is applied to the anchor
      .attr('transform', 'translate(0,'+(height/2)+')rotate(-90)')  // text is drawn off the screen top left, move down and out and rotate
      .text('Users Count');

    function mouseMove(d) {
      let coordinates = d3.mouse(el),
        {width, height} = tooltip.node().getBoundingClientRect(),
        topOffset = 10;

      tooltip
        .style('left', coordinates[0] - (width / 2) + 'px') // set in center
        .style('top', coordinates[1] - topOffset - height + 'px') // top 10 px
        .html(`Age: ${d.age} <br/> Users: ${d.value}`);
    }

  };

  static getChartData(users) {
    let grouped = _.groupBy(users, (u) => (u.age)),
      domainX = Object.keys(grouped).map((k) => (+k)),
      data = domainX.map((i) => ({age: +i, value: grouped[i].length})),
      domainY = [0, d3.max(data.map((i) => (i.value)))];
    return {domainX, domainY, data}
  }

}

export default UsersAgeChartComponent;
