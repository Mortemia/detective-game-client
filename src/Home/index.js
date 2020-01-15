import React from "react";
import SimpleBar from "./SimpleBar";
import Banner from "./Banner";
import InfoGrid from "./InfoGrid";
import Divider from '@material-ui/core/Divider';
import { makeStyles } from "@material-ui/core/styles";
import './home.css';

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
      <Banner />
      <Divider />
      <InfoGrid />
    </div>
  );
};

export default Home;
