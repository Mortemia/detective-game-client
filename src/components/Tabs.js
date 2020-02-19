import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const a11yProps = index => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const TabContainer = props => {
  const { children, value, index, ...other } = props;

  return (
    <>
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
    </>
  );
};
