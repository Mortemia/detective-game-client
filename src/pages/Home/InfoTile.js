import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center"
  }
}));

const InfoTile = props => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <props.icon fontSize="large" />
        <div className="info-header">
          {" "}
          <Typography variant="h6">
            {" "}
            {props.header}
          </Typography>
        </div>
      </div>
      <Typography variant="subtitle1">
        {" "}
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
    </>
  );
};

export default InfoTile;
