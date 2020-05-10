import React from 'react';
import PropTypes from 'prop-types';
import './node.css';

const propTypes = {
  nodeData: PropTypes.object.isRequired,
};

const Node = ({ nodeData }) => {
  const selectNode = () => {
    console.log(nodeData.name);
  };

  return (
    <div onClick={selectNode}>
      <div className='position'>{nodeData.title}</div>
      <div className='fullname'>{nodeData.name}</div>
    </div>
  );
};

Node.propTypes = propTypes;

export default Node;
