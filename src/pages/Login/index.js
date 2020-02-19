import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import * as PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Login from './Login';
import Register from './Register';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '35rem',
    justifyContent: 'center',
    margin: 'auto',
    padding: theme.spacing(2),
  },
  tab: {
    maxWidth: 'none',
    width: '50%',
  },
  content: {
    padding: theme.spacing(1),
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabPanel = props => {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component='div'
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={2}>{children}</Box>}
      </Typography>
    );
  };

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  const a11yProps = index => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  return (
    <div className={classes.root}>
      <Paper>
        <Tabs
          value={value}
          indicatorColor='primary'
          textColor='primary'
          onChange={handleChange}
          aria-label='login form usage'
          centered
        >
          <Tab className={classes.tab} label='Logowanie' {...a11yProps(0)} />
          <Tab className={classes.tab} label='Rejestracja' {...a11yProps(1)} />
        </Tabs>
        <div className={classes.content}>
          <TabPanel value={value} index={0}>
            <Login />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Register />
          </TabPanel>
        </div>
      </Paper>
    </div>
  );
};

export default LoginForm;
