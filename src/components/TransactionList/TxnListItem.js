import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Blockie from '../Blockie';

TxnListItem.propTypes = {
  tx: PropTypes.object.isRequired,
};

export default function TxnListItem({ tx }) {
  
  return (
    <div className='txn-list-item txn-card'>
      <div className='row'>
        <Blockie
          hash={tx.hash}
          className='blockie-txn'
        />
        <div>
          <div className='row'>
            <label>Hash</label>
            <div className='width-control-txn'>
                <Link to={`/txn/${tx.hash}`}>{tx.hash}</Link>
            </div>
          </div>
          <div className='row space-around'>
            <div className='row'>
              <label>Inputs</label>
              <div>{tx.inputs.length}</div>  
            </div>
            <div className='row'>
              <label>Outputs</label>
              <div>{tx.out.length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
