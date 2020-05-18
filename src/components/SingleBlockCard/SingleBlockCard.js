import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import ObjectDataList from '../ObjectDataList';
import TransactionList from '../TransactionList/TransactionList';
import Blockie from '../Blockie';
import LoadingTxn from '../Loaders/LoadingTxn';

import './singleBlockCard.css'

class SingleBlockCard extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    block: PropTypes.object,
    getSingleBlockData: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { match, getSingleBlockData } = this.props;
    getSingleBlockData(match.params.blockHash);
  }

  render() {
    const { block, status } = this.props;

    return (
      <div>
        <header className="App-header">
          <h4>
            Bitcoin Block
          </h4>
        </header>
        {status === 'error' &&
          <h3 style={{ color: 'red' }}>There was a problem getting data from the server</h3>
        }
        {(status === 'done' && block) ? (
          <div className='txn-list-block-info'>
            <Blockie
              hash={block.hash}
              className='blockie-single'
            />
            <ObjectDataList
              obj={block}
              className='width-control-data'
            />
            <TransactionList
              txns={block.tx}
              totalResults={block.n_tx}
            />
          </div>
        ) : (
            <LoadingTxn />
          )}
      </div>
    );
  }
}

const getDisplayedBlock = (blocks, hash) => {
  return blocks.filter(block => block.hash === hash)[0]
}

const mapStateToProps = state => ({
  status: state.data.status.singleBlock,
  block: getDisplayedBlock(state.data.rawBlocks, state.data.display.blockHash),
})

const mapDispatchToProps = dispatch => ({
  getSingleBlockData: (hash) => dispatch(actions.getSingleBlockData(hash))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleBlockCard);
