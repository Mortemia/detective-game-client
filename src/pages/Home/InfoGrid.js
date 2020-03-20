import React from 'react';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import MapIcon from '@material-ui/icons/Map';
import ForumIcon from '@material-ui/icons/Forum';
import ExtensionIcon from '@material-ui/icons/Extension';
import Grid from '@material-ui/core/Grid';
import InfoTile from './InfoTile';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';

const infos = [
  {
    header: 'Badaj',
    icon: FingerprintIcon,
  },
  {
    header: 'Przesłuchuj',
    icon: ForumIcon,
  },
  {
    header: 'Podróżuj',
    icon: MapIcon,
  },
  {
    header: 'Łącz fakty',
    icon: ExtensionIcon,
  },
];

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
    marginTop: theme.spacing(6),
  },
}));

const InfoGrid = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={6}>
        {infos.map((info, index) => (
          <Grow key={index} in timeout={500 * (index + 1)}>
            <Grid item xs={12} sm={12} md={3}>
              <InfoTile icon={info.icon} header={info.header} />
            </Grid>
          </Grow>
        ))}
      </Grid>
    </div>
  );
};

export default InfoGrid;
