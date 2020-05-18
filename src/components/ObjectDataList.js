import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

ObjectDataList.propTypes = {
  obj: PropTypes.object.isRequired,
  labelWidth: PropTypes.string,
  className: PropTypes.string,
};

export default function ObjectDataList({ obj, labelWidth = '115px', className }) {
  
  let labels = Object.keys(obj);
  
  let content = labels.map((label) => {
    if(typeof obj[label] === "string" || typeof obj[label] === "number") {  
      return (
        <div key={uuidv4()} className='object-data-list-item'>
          <label style={{ minWidth: labelWidth }}>
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </label>
          <div className={className}>{obj[label]}</div>
          <br/> 
        </div>
      )
    }
  })
  
  return (
    <div className='object-data-list'>
      {content}
    </div>
  );
}
