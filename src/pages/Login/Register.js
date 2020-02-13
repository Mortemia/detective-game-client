import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import {AccountCircle, VpnKey} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        padding: theme.spacing(2),
        margin: 2
    },
    margin: {
        margin: 20
    }
}));

const Register = () => {
    const classes = useStyles();

    return (
        <div className={classes.margin}>
            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item>
                    <AccountCircle />
                </Grid>
                <Grid item>
                    <TextField id="username" label="Użytkownik" />
                </Grid>
            </Grid>
            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item>
                    <VpnKey />
                </Grid>
                <Grid item>
                    <TextField id="password" label="Hasło" type="password" />
                </Grid>
            </Grid>
            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item>
                    <VpnKey />
                </Grid>
                <Grid item>
                    <TextField id="passwordRepeat" label="Powtórz hasło" type="password" />
                </Grid>
            </Grid>
            <Grid container spacing={2} item justify="center" alignItems="center" margin="2" >
                <Button variant='contained' color='primary' className={classes.margin}>
                   Zarejstuj się
                </Button>
            </Grid>
        </div>
    );
};

export default Register;
