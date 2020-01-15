import React from "react";
import SimpleBar from "./SimpleBar";
import InfoGrid from "./InfoGrid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    //marginLeft: theme.spacing(4)
  }
}));

const Home = props => {
  const classes = useStyles();

  return (
    <div>
      <SimpleBar />
    
        <InfoGrid />
    </div>
  );
};

export default Home;
