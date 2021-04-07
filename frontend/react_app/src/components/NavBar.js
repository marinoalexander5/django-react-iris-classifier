import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button }  from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function NavBar(props) {
    const classes = useStyles();

    return(    
    <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                Iris Species Predictor
                </Typography>
                <IconButton color="inherit" aria-label="home page" href="/">
                    <HomeIcon />
                </IconButton>
                {props.isAuthenticated ? <Button color="inherit" href="/update_password">Update Password</Button> : null}
                {props.isAuthenticated ? <Button color="inherit" onClick={() => props.logout()}>Logout</Button> : 
                <Button color="inherit">Login</Button> }
            </Toolbar>
        </AppBar>
    </div>
    );
}