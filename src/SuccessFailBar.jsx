import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const SuccessFailBar = (props) => {
  const { color, incorrectMove } = props;
  return (
    <div style={{ backgroundColor: color, color: 'white' }}>

      <Typography>
        {color === 'green' ? 'Success!' : `Incorrect Move ${incorrectMove}`}
      </Typography>
    </div>
  );
};

export default SuccessFailBar;
