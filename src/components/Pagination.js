import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';

Pagination.propTypes = {
  txnPage: PropTypes.number.isRequired,
  setDisplay: PropTypes.func.isRequired,
  totalResults: PropTypes.number.isRequired,
  currentPage: PropTypes.func.isRequired,
};

function Pagination({ txnPage, setDisplay, totalResults, currentPage }) {
  
  // get last displayed page from store
  const [page, setPage] = useState(txnPage);
  let start = page * 10;
  let stop = (page + 1) * 10 - 1;
  
  useEffect(() => {
    // lift up state
    currentPage({ start, stop });
    // save in store when component unmounts
    return () => {
      setDisplay({ label: 'txnPage', value: page })
    }
  })
  
  return (
    <div className='pagination'>

      <div>
        Showing {start} to {stop > totalResults ? totalResults : stop} of {totalResults} results
      </div>

      {page === 0 ? (
        <button disabled>Back</button>
      ) : (
        <button onClick={() => setPage(page - 1)}>Back</button>
      )}

      {stop > totalResults ? (
        <button disabled>Next</button>
      ) : (
        <button onClick={() => setPage(page + 1)}>Next</button>
      )}
      
    </div>
  );
}

const mapStateToProps = state => ({
  txnPage: state.data.display.txnPage,
})

const mapDispatchToProps = dispatch => ({
  setDisplay: (hash) => dispatch(actions.setDisplay(hash)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);