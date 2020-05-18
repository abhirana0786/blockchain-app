import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import ObjectDataList from '../ObjectDataList';
import LoadingTxn from '../Loaders/LoadingTxn';
import Blockie from '../Blockie';

SingleTxnCard.propTypes = {
  match: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  tx: PropTypes.object.isRequired,
  getTxnData: PropTypes.func.isRequired,
};

function SingleTxnCard({ match, status, tx, getTxnData }) {
  
  getTxnData(match.params.txnHash);

  function createInputs() {
    return tx.inputs.map((item) => {
      return (
        <ObjectDataList
          key={uuidv4()}
          obj={item}
          labelWidth='80px'
          className='width-control-io'
        />
      )
    })    
  }

  function createOutputs() {
    return tx.out.map((item) => {
      return (
        <ObjectDataList
          key={uuidv4()}
          obj={item}
          labelWidth='80px'
          className='width-control-io'
        />
      )
    })
  }
  
  return (
    <div>
      <header className="App-header">
        <h4>
          Bitcoin Transaction 
        </h4>
      </header>
        {status === 'error' &&
          <h3 style={{ color: 'red' }}>There was a problem getting data from the server</h3>
        }
        {tx ? (
          <div className='txn-list-block-info'>
            <Blockie
              hash={tx.hash}
              className='blockie-single'
            />
            <div style={{ padding: '10px' }}>
              <ObjectDataList 
                obj={tx}
                className='width-control-data'
              />
            </div>
            <div className='transaction-list'>
              <div className='txn-card'>
                <h5>Inputs</h5>
                {createInputs()}
              </div>
              <div className='txn-card'>
                <h5>Outputs</h5>
                {createOutputs()}
              </div>
            </div>
          </div>
        ) : (
          <LoadingTxn />
        )}
    </div>
  );
}

const getDisplayedTxn = (txns, hash) => {
  return txns.filter(tx => tx.hash === hash)[0]
}

const mapStateToProps = state => ({
  status: state.data.status.singleTxn,
  tx: getDisplayedTxn(state.data.rawTxns, state.data.display.txnHash),
})

const mapDispatchToProps = dispatch => ({
  getTxnData: (hash) => dispatch(actions.getTxnData(hash))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleTxnCard);
