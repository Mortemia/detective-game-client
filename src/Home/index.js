import React from "react";
import SimpleBar from "./SimpleBar";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InfoTile from "./InfoTile";
import NavigationIcon from "@material-ui/icons/Navigation";
import ComputerIcon from "@material-ui/icons/Computer";
import MapIcon from "@material-ui/icons/Map";
import ChatIcon from "@material-ui/icons/SmsOutlined";

const infos = [
  {
    header: "Badaj",
    icon: ComputerIcon
  },
  {
    header: "Przesłuchuj",
    icon: ChatIcon
  },
  {
    header: "Podróżuj",
    icon: MapIcon
  },
  {
    header: "Łącz fakty",
    icon: NavigationIcon
  }
];

const useStyles = makeStyles(theme => ({
  gridRoot: {
    position: "relative",
    flexGrow: 1,
    margin: theme.spacing(4)
  },
  gridItem: {
    maxWidth: "100%"
  },
  root: {
    marginLeft: theme.spacing(9),
    marginRight: theme.spacing(9)
  }
}));

const Home = props => {
  const classes = useStyles();

  return (
    <div className="home">
      <SimpleBar />
      Home, hello {props.hello}
      <div className={classes.root}>
        <Grid container spacing={3}>
          {infos.map((info, index) => (
            <div key={index} className={classes.gridRoot}>
              <Grid item xs={3} className={classes.gridItem}>
                <InfoTile icon={info.icon} header={info.header} />
              </Grid>
            </div>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
