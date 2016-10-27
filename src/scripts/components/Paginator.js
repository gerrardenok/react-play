import React, {PropTypes} from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

const PaginatorComponent = (props) => {

  const handlePageSelect = (page) => (e) => {
    e.preventDefault();
    props.onPageSelect(page);
  };

  const pageLink = (page) => {
    if (page == props.page)
      return (
        <PaginationLink>{props.page}</PaginationLink>
      );
    else
      return (
        <PaginationLink href="#" onClick={handlePageSelect(page)}>
          {page}
        </PaginationLink>
      )
  };


  let back = (props.page > 1) ? (
    <PaginationItem>
      <PaginationLink previous href="#" onClick={handlePageSelect(props.page - 1)}/>
    </PaginationItem>
  ) : '';

  let totalPages = Math.round(props.total / props.pageSize),
    canNext = totalPages > props.page,
    next = (canNext) ? (
      <PaginationItem>
        <PaginationLink next href="#" onClick={handlePageSelect(props.page + 1)}/>
      </PaginationItem>
    ) : '';


  let pageItems = range(1, totalPages, 1);

  return (
    <Pagination size='sm'>
      {back}
      {pageItems.map((i)=>(
          <PaginationItem key={i}>{pageLink(i)}</PaginationItem>
        ))}
      {next}
    </Pagination>
  );
};

PaginatorComponent.defaultProps = {
  page: 1,
  pageSize: 10,
  total: 0,
  onPageSelect: () => {
  }
};

PaginatorComponent.propTypes = {
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPageSelect: PropTypes.func
};

/**
 * TODO: Use generator
 * */
function range(begin, end, interval = 1) {
  let out = [];
  for (let i = begin; i <= end; i += interval) {
    out.push(i)
  }
  return out;
}

export default PaginatorComponent;
