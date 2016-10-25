import React, {PropTypes} from 'react';

class SortComponent extends React.Component {

  sortAsc = (e) => {
    this.props.sort(this.props.field, 'asc');
  };

  sortDesc = (e) =>  {
    this.props.sort(this.props.field, 'desc');
  };

  render() {
    let inner = ((<i className="fa fa-angle-double-left" onClick={this.sortAsc}>{''}</i>));
    if(this.props.values) {
      let val = this.props.values[this.props.field];
      if (val == 'asc')
        inner = (<i className="fa fa-angle-double-up" onClick={this.sortDesc}>{''}</i>);
      if (val == 'desc')
        inner = (<i className="fa fa-angle-double-down" onClick={this.sortAsc}>{''}</i>);
    }
    return (
      <span className="sort-ctrl float-xs-right">{inner}</span>
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
