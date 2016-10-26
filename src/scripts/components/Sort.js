import React, {PropTypes} from 'react';

class SortComponent extends React.Component {

  handleSortAsc = (e) => {
    this.props.onSort(this.props.field, 'asc');
  };

  handleSortDesc = (e) =>  {
    this.props.onSort(this.props.field, 'desc');
  };

  static defaultProps = {
    values: {},
    field: '',
    sort: (field, value) => {}
  };

  static propTypes = {
    values: PropTypes.object,
    field: PropTypes.string.isRequired,
    onSort: PropTypes.func.isRequired
  };

  render() {
    let inner = ((<i className="fa fa-angle-double-left" onClick={this.handleSortAsc}>{''}</i>));
    if(this.props.values) {
      let val = this.props.values[this.props.field];
      if (val == 'asc')
        inner = (<i className="fa fa-angle-double-up" onClick={this.handleSortDesc}>{''}</i>);
      if (val == 'desc')
        inner = (<i className="fa fa-angle-double-down" onClick={this.handleSortAsc}>{''}</i>);
    }
    return (
      <span className="sort-ctrl">
        {' '}
        {inner}
        {' '}
      </span>
    )
  }
}

export default SortComponent;
