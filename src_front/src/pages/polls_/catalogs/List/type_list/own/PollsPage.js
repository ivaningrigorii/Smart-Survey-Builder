import React, { Component, useState } from 'react';
import Footer from "../../../../../../components/Footer/Footer";
import Header from "../../../../../../components/Header/Header";
import AuthServices from '../../../../../personal/Auth/AuthServices';
import routes from '../../../../../../routes';
import { Grid, Box, } from '@mui/material';
import MenuCatalogs from '../../components/MenuCatalogs';
import { main } from '../../styles';
import { makeStyles } from '@mui/styles';
import SearchElement from '../../components/SearchElement';
import { useParams } from 'react-router';
import PollsServices from '../../PollsServices';
import { height } from '@mui/system';

const ps = new PollsServices();
const auths = new AuthServices();
const useStylesThis = makeStyles({
    grid_style: {
        marginTop: '5%',
    },
    enter: {
        marginTop: '5%',
    }
});


const PollsPage = () => {
    document.title = "Каталог созданные опросы";
    const classes = main();
    const classes_this = useStylesThis();

    if (!auths.findAuthTokens()) {
        return window.location.replace(routes.auth.login);
    } else {
        ps.getPollsOwn(1, 4);
        return (
            <Box className={classes.body_style}>
                <Header />
                <Box sx={{height: '25px', }}/>
                <Grid container direction="row"
                    className={classes_this.grid_style}
                    justifyContent="space-between" alignItems="center">
                    <SearchElement/>
                    <MenuCatalogs titleSelectedOption={"Созданные опросы"} />
                </Grid>
                <br/><br/><hr/>
               
                <Box className={classes_this.enter}/>
                <Footer />
            </Box>
        );
    }
}
export default PollsPage;