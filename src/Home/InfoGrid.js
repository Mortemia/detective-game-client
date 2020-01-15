import React from "react";
import NavigationIcon from "@material-ui/icons/Navigation";
import ComputerIcon from "@material-ui/icons/Computer";
import MapIcon from "@material-ui/icons/Map";
import ChatIcon from "@material-ui/icons/SmsOutlined";
import Grid from "@material-ui/core/Grid";
import InfoTile from "./InfoTile";
import { makeStyles } from "@material-ui/core/styles";

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
  root: {
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
    marginTop: theme.spacing(3)
  }
}));

const InfoGrid = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={6}>
        {infos.map(info => (
          <Grid item xs={12} sm={12} md={3} >
            <InfoTile icon={info.icon} header={info.header} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default InfoGrid;
