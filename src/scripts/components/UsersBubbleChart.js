import React from 'react';
import * as d3 from 'd3';
import Faux from 'react-faux-dom'

class UsersBubbleChart extends React.Component {

  constructor(props) {
    super(props);
    this.faux = Faux.createElement('div');
    this.svg = d3.select(this.faux).append('svg');
  }

  componentDidMount() {
    let {svg, props: {width, height}} = this;
    svg.attr('width', width)
      .attr('height', height);

    let circle = svg.append('circle')
      .attr('cx', 30)
      .attr('cy', 30)
      .attr('r', 20);

  }

  render() {
    let {faux} = this;
    return (<div>{faux.toReact()}</div>)
  }

  static defaultProps = {
    users: [],
    width: 100,
    height: 100
  };

}

export default UsersBubbleChart;
