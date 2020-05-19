import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Blockie from '../Blockie';

BlockListItem.propTypes = {
  block: PropTypes.shape({
    height: PropTypes.number.isRequired,
    hash: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired
  }).isRequired,
  // onClick: PropTypes.func.isRequired,
};

export default function BlockListItem(props) {
  const { block: { height, hash, time } } = props;

  return (
    <div className="block-list-item">
      {window.innerWidth < 600 ? (
        <>
          {hash &&
            <Blockie
              hash={hash}
              className='blockie'
            />
          }
          <div className='row'>
            <label>Height</label>
            <div>
              {height}
            </div>
          </div>

          <div className='row'>
            <label>Hash</label>
            <div className='width-control-io'>
              <Link to={`/block/${hash}`}>{hash}</Link>
            </div>
          </div>

          <div className='row'>
            <label>Minutes</label>
            <div>
              {convert_epoch_to_minutes_ago(time)} minutes ago
            </div>
          </div>
        </>
      ) : (
          <>
            {hash &&
              <Blockie
                hash={hash}
                className='blockie'
              />
            }
            <div>
              {height}
            </div>

            <div style={{ width: '210px' }}>
              <Link to={`/block/${hash}`}>{hash}</Link>
            </div>

            <div>
              {convert_epoch_to_minutes_ago(time)} minutes ago
          </div>
          </>
        )}
    </div>
  );
}

function convert_epoch_to_minutes_ago(epoch) {
  return Math.round((Date.now() - new Date(epoch * 1000)) / 60000, 0);
}

