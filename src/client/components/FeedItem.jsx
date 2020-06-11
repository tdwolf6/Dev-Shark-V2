import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles({
  itemWrap: {
    background: '#fdfdfd',
    marginBottom: 15,
    minWidth: 350,
  },
  itemActions: {
    justifyContent: 'space-between',
    display: 'flex',
  },
  itemDiv: {
    marginTop: 8,
    marginBottom: 8,
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  coloredStar: {
    color: 'red'
  }
});

const FeedItem = (props) => {
  const classes = useStyles();

  const [isFav, setFav] = useState(props.favBoolean);
  
  
  const toggleFav = () => {
    console.log(props.favoriteResources, 'props . favorite resources')
    if (!isFav){
      props.addFav(props.id);
    } else {
      props.deleteFav(props.id);
    }
  }

  
  useEffect(() => {
    // call new action to get topics
    setFav(props.favBoolean)
  });
  
  

  return (
    <Card className={classes.itemWrap}>
      <CardContent>
        <Box className={classes.titleContainer}>
        {/* displays resource title */}
          <Typography variant="h6">{props.name}</Typography>
          <Button onClick={toggleFav} >{isFav ? (<StarIcon  className={classes.coloredStar}/>) : (< StarBorderIcon className={classes.borderStar}/>) }</Button>
        </Box>
        {/* displays resource description */}
        <Typography variant="body1">{props.description}</Typography>
        <Divider className={classes.itemDiv} />
        <div className={classes.itemActions}>
        {/* displays resource link */}
          <Button size="small" color="primary">
            <a href={props.url} target="_blank">
              Visit Resource
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedItem;
