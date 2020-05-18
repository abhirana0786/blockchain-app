import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import BlockListItem from './BlockList/BlockListItem';


class LatestBlock extends Component {

  static propTypes = {
    block: PropTypes.object,
    getLatestBlock: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getLatestBlock();
    this.interval = setInterval(this.props.getLatestBlock(), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { block } = this.props;

    return (
      <div className="block-list">
        <h2>
          Latest Block
        </h2>
        {window.innerWidth > 600 &&
          <div className='block-list-table-header'>
            <div style={{ width: '50px' }}></div>
            <div style={{ width: '60px' }}>Height</div>
            <div style={{ width: '210px' }}>Hash</div>
            <div style={{ width: '110px' }}>Mined</div>
          </div>
        }
        {Object.keys(block).length === 0 ? (
          <div>Loading...</div>
        ) : (
            <BlockListItem
              block={block}
            />
          )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  block: state.data.latestBlock
})

const mapDispatchToProps = dispatch => ({
  getLatestBlock: () => dispatch(actions.getLatestBlock()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LatestBlock);

