import React from 'react'
import { Button } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

const StyledButton = withStyles({
  root: {
    backgroundColor: 'red',
    color: 'white',
  }
})(Button);

const Logout = (props) => {

  const handleLogout = (e) => {
    e.preventDefault();
    props.logout();
    //props.getResources('Javascript');
    //props.getTopics();
  }
  
  return (
    <StyledButton onClick={handleLogout} variant="outlined">Logout</StyledButton>
  );
}

export default Logout