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
  addFavClicked: {
    backgroundColor: 'yellow'
  }
});

const FeedItem = (props) => {
  const classes = useStyles();

  // toggles the heart icon and calls action to increment/decrement 'likes' accordingly
  // props.liked, props.tech, and props.id passed down from DB to parent component to FeedItem
  const toggleHeart = () => {
    if (props.liked) {
      props.downvote(props.id, props.tech);
    } else {
      props.upvote(props.id, props.tech);
    }
  };

  const [isFav, setFav] = useState(props.favBoolean);
  const toggleFav = () => {
    console.log(props.favoriteResources, 'props . favorite resources')
    if (!isFav){
      props.addFav(props.id)
      setFav(true);
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
          <button onClick={toggleFav} className={isFav ? classes.addFavClicked : classes.addFav}>ADD FAV</button>
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
          {/* toggles heart */}
          <Button size="small" onClick={() => toggleHeart()}>
            {props.likes}
            {props.liked ? (
              <FavoriteRoundedIcon />
            ) : (
              <FavoriteBorderRoundedIcon />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedItem;
