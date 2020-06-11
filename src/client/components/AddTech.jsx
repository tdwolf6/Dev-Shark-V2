import React, { useState } from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

import * as actions from '../actions/actions';
const useStyles = makeStyles((theme) => ({
  floatedAdd: {
    position: 'fixed',
    bottom: 50,
    left: 60,
  },
  floatedForm: {
    position: 'absolute',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  paper: {
    position: 'absolute',
    padding: theme.spacing(5),
    boxShadow: theme.shadows[5],
    outline: 0,
    width: 500,
    backgroundColor: theme.palette.background.paper,
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    '& > *': {
      margin: theme.spacing(1, 0),
    },
  },
  formControl: {
    minWidth: 175,
  },
}));

export default function AddTech(props){
  const classes = useStyles();

  // gets list of topics to populate our form's select menu items
  const techs = props.techs;

  // setting initial form states
  // as well as default values for resource object
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  // const [description, setDesc] = useState('');
  // const [url, setUrl] = useState('');
  // const [tech, setTech] = useState('');

  // const liked = false;
  // const likes = 0;

  const validateForm = () => {
    if ( name === '') {
      // at least one field is empty, return false
      console.log('All form fields are required');
      return false;
    } else {
      // form is validated
      console.log('Form is validated!');
      return true;
    }
  };

  // clears form when successfully submitting form
  // and when exiting modal
  const clearForm = () => {
    setName('');
  };

  // called to toggle form modal
  const toggleForm = () => {
    setOpen(open ? false : true);
  };

  // called when 'submit' button is clicked
  // first ensures form is valid by checking that no field is left blank
  // then calls the appropriate dispatch action passed down as a prop
  // to add new resource to database
  // (small delay added before closing modal to simulate a brief 'thinking' period)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      let techName = { name };
      console.log('Sending the following resource to db:');
      console.log('lets rename resource obj ------->',techName.name);
      props.addTopic(techName.name);
      setTimeout(() => {
        console.log('Resetting form and closing modal');
        clearForm();
        setOpen(false);
      }, 250);
    }
  };

  // generic change event listener handling change for
  // all input fields based on their name attribute
  const handleChange = (e) => {
    let inputVal = e.target.value;
    switch (e.target.name) {
      case 'name':
        setName(inputVal);
        break;
      }
  };

  // defines the form that gets populated in our modal
  const formBody = (
    <div className={classes.paper}>
      <Typography variant="h5">Add Tech</Typography>
      <TextField
        required
        fullWidth
        name="name"
        label="Tech name"
        variant="outlined"
        value={name}
        onChange={handleChange}
      />
      <FormControl required variant="outlined" className={classes.formControl}>
        
        {/* <Select name="tech" value={tech} onChange={handleChange} label="Tech">
          {techs.map((elem, index) => {
            if (elem === 'Favorites'){
              return;
            }
            return (
              <MenuItem key={index} value={elem.toLowerCase()}>
                {elem}
              </MenuItem>
            );
          })}
        </Select> */}
      </FormControl>
      <div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <div className={classes.floatedAdd} onClick={toggleForm}>
        <Fab color="primary" aria-label="add" variant="extended">
          <AddIcon className={classes.extendedIcon} />
          ADD Tech
        </Fab>
      </div>
      <div className={classes.floatedForm}>
        <Modal open={open} onClose={toggleForm}>
          {formBody}
        </Modal>
      </div>
    </div>
  );
    
}
