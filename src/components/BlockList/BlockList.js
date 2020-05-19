import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import BlockListItem from './BlockListItem';


class BlockList extends Component {

  static propTypes = {
    getBlockData: PropTypes.func.isRequired,
    // onBlockClick: PropTypes.func.isRequired,
    blocks: PropTypes.array
  };

  componentDidMount() {
    this.props.getBlockData();
  }

  createListOfBlocks = () => {
    let blockList = [];
    if (this.props.blocks && this.props.blocks.length !== 0) {
      blockList = this.props.blocks.map(block => {
        return (
          <BlockListItem
            key={block.height}
            block={block}
          // onClick={this.props.onBlockClick}
          />
        )
      })
    } else {
      blockList.push(
        <div key={0}>
          <div>Loading...</div>
          <div>Loading...</div>
          <div>Loading...</div>
        </div>
      )
    }
    return blockList
  }

  render() {

    return (
      <div className="block-list">
        <h2>
          Today's Blocks
        </h2>
        {window.innerWidth > 600 &&
          <div className='block-list-table-header'>
            <div style={{ width: '50px' }}></div>
            <div style={{ width: '50px' }}>Height</div>
            <div style={{ width: '200px' }}>Hash</div>
            <div style={{ width: '100px' }}>Minutes</div>
          </div>
        }
        {this.createListOfBlocks()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    blocks: state.data.blocks,
  }
}

const mapDispatchToProps = dispatch => ({
  getBlockData: () => dispatch(actions.getBlockData()),
})

export default connect(mapStateToProps, mapDispatchToProps)(BlockList);
