import React from "react";
import CarouselUI from 'react-material-ui-carousel'
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const text = [
    "STWÓRZ WŁASNĄ UNIKALNĄ SPRAWĘ DETEKTYWISTYCZNĄ",
    "WCIEL SIĘ WRAZ Z ZNAJOMYMI W DETEKTYWOW I WSPÓLNIE ROZWIĄŻCIE SPRAWĘ",
    "ROZGRYWAJ HISTORIE STWORZONE PRZEZ INNYCH GRACZY"
  ];

const useStyles = makeStyles(theme => ({
  root: {
      padding: theme.spacing(2)
  }, 
  indicators: {
     
  }
}));

const Carousel = () => {
  const classes = useStyles();

  return (<div className={classes.root}>
      <CarouselUI indicators="false"  >
          {
              text.map((item, index) => (
                  <Typography key={index}>
                      {item}
                  </Typography>
              ))
          }
      </CarouselUI>
  </div>);
};

export default Carousel;
