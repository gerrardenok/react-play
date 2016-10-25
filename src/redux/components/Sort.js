import React, {PropTypes} from 'react';

class SortComponent extends React.Component {

  sortAsc = (e) => {
    this.props.sort(this.props.field, 'asc');
  };

  sortDesc = (e) =>  {
    this.props.sort(this.props.field, 'desc');
  };

  render() {
    let inner = ((<span onClick={this.sortAsc}>[+]</span>));
    if(this.props.values) {
      let val = this.props.values[this.props.field];
      if (val == 'asc')
        inner = (<span onClick={this.sortDesc}>[asc]</span>);
      if (val == 'desc')
        inner = (<span onClick={this.sortAsc}>[desc]</span>);
    }
    return (
      <span>{inner}</span>
    )
  }
}

SortComponent.defaultProps = {
  values: {},
  field: '',
  sort: (field, value) => {}
};

SortComponent.propTypes = {
  values: PropTypes.object,
  field: PropTypes.string.isRequired,
  sort: PropTypes.func.isRequired
};

export default SortComponent;
