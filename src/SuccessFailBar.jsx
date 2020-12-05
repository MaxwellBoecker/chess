import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const SuccessFailBar = (props) => {
  const { color } = props;
  return (
    <div style={{ backgroundColor: color, color: 'white' }}>

      <Typography>
        {color === 'green' ? 'Success!' : 'Incorrect Move'}
      </Typography>
    </div>
  );
};

export default SuccessFailBar;
