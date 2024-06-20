/**
 *
 * Dashboard
 *
 */

import React, { memo,useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {makeSelectDashboard,
    makeSelectOdoo
} from './selectors';
import { odooRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { bindActionCreators } from 'redux';


import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import './Dashboard.css'
import { TextField } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        width: '80rem',
        height: '40rem'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 25,
    },
    pos: {
        marginBottom: 12,
    },
});



const useStyles1 = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '70rem'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


const useStyles2 = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '50rem',
        padding: '10px',
        height: '10vh',
        color: 'red'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
}));

// function getModalStyle() {
//     const top = 50 + rand();
//     const left = 50 + rand();

//     return {
//         top: `${top}%`,
//         left: `${left}%`,
//         transform: `translate(-${top}%, -${left}%)`,
//     };
// }

const useStyles3 = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
     
    },
  }));

export function Dashboard({
    onOdoo,
    odooRes
}) {
    useInjectReducer({ key: 'dashboard', reducer });
    useInjectSaga({ key: 'dashboard', saga });

    // useEffect(() => {
    //     onOdoo("vish")
    // }, [onOdoo])

    // useEffect(() => {
    //     console.log('calling data by props', odooRes)
    // }, [odooRes])


    const classes = useStyles();
    const classes1 = useStyles1();
    const classes2 = useStyles2();
    const classes3 = useStyles3();

    // const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [password, setPassword] = React.useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        console.log("password",password)
        onOdoo(password);
        handleClose();

    }

    // const body = (
    //     <div style={modalStyle} className={classes.paper}>
    //         <h2 id="simple-modal-title">Text in a modal</h2>
    //         <p id="simple-modal-description">
    //             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    //         </p>
    //         <Dashboard />
    //         {/* <SimpleModal /> */}
    //     </div>
    // );

    return (
        <div className='dashboard-container'>
            <Card className={classes.root}>
                <CardContent className='card-container'>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Welcome to
                    </Typography>
                    <Typography>
                        <h2>Odoo</h2>
                    </Typography>

                    <div className={classes1.root}>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    className={classes1.menuButton}
                                    color="inherit"
                                    aria-label="open drawer"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography className={classes1.title} variant="h6" noWrap>
                                    Material-UI
                                </Typography>
                                <div className={classes1.search}>
                                    <div className={classes1.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        placeholder="Search…"
                                        classes={{
                                            root: classes1.inputRoot,
                                            input: classes1.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </div>
                            </Toolbar>
                        </AppBar>
                    </div>

                    <div className={classes2.root}>
                        <Grid container spacing={4}>

                            <Grid item xs={4}>
                                <button type="button" onClick={handleOpen}>
                                    Vishwas
                                </button>
                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    className={classes3.modal}
                                    open={open}
                                    onClose={handleClose}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    <Fade in={open}>
                                        <div className={classes3.paper}>
                                            <h2 id="transition-modal-title">Vishwas</h2>
                                            <p id="transition-modal-description">Enter the Password</p>
                                            <TextField id="standard-basic" 
                                                label="Enter Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                 />
                                            <Button variant="contained" size="large" className={classes2.button} onClick={handleSubmit}>Submit</Button>
                                        </div>
                                    </Fade>
                                </Modal>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="contained" size="large" className={classes2.button}>Rahul</Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="contained" size="large" className={classes2.button}>Rakesh</Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="contained" size="large" className={classes2.button}>Nikhil</Button>
                            </Grid>
                        </Grid>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}

Dashboard.propTypes = {
    dispatch: PropTypes.func.isRequired,
    onOdoo: PropTypes.func,
    odooRes: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
    dashboard: makeSelectDashboard(),
    odooRes: makeSelectOdoo(),
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onOdoo: (valueToPass) => {
          console.log('valueToPass', valueToPass);
          return odooRequest(valueToPass);
        }
      }, dispatch);
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(Dashboard);
