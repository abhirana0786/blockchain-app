import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../Pagination';
import TxnListItem from './TxnListItem';

TransactionList.propTypes = {
  txns: PropTypes.array.isRequired,
};

export default function TransactionList({ txns, totalResults }) {
  
  const [currentPage, setCurrentPage] = useState({ start: 0, stop: 9 });
  
  let itemList = txns.slice(currentPage.start, currentPage.stop).map((tx) => {
      return (
        <TxnListItem 
          key={tx.tx_index}
          tx={tx}
        />
      )
  })
  
  return (
    <div className='transaction-list'>
      <h4>
        TransactionList
      </h4>
      <Pagination
        totalResults={totalResults}
        currentPage={setCurrentPage}
      />
      {itemList}
    </div>
  );
}
