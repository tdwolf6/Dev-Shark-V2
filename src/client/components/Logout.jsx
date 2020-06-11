import React from 'react'
import { Button } from '@material-ui/core';
import Cookies from 'universal-cookie';
import { withStyles } from '@material-ui/core/styles';
const cookies = new Cookies();

const StyledButton = withStyles({
  root: {
    backgroundColor: 'red',
    color: 'white',
  }
})(Button);

const Logout = (props) => {

  const handleLogout = (e) => {
    e.preventDefault();
    console.log('DESTROYING COOKIE')
    cookies.remove('jwt', { path: '/' });
    props.logout();
  }
  
  return (
    <StyledButton onClick={handleLogout} variant="outlined">Logout</StyledButton>
  );
}

export default Logout