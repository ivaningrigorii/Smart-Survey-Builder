import Header from "../../../../components/Header/Header";
import React, { Component, useEffect, useState } from 'react';
import { makeStyles } from "@mui/styles";
import Footer from "../../../../components/Footer/Footer";
import CreateSelecter from "./components/CreateSelecter";
import AuthServices from "../../../personal/Auth/AuthServices";
import { Box } from "@mui/material";
import routes from "../../../../routes";

import { createTheme, ThemeProvider, } from "@mui/material/styles";
const auths = new AuthServices();
const useStyles = makeStyles({
    body_pages: {
        background: "linear-gradient(41deg, rgba(242,227,185,1) 15%, rgba(240,180,203,1) 69%)",
    },
});
  

const CreatePage = () => {
    const classes = useStyles();
    document.title = "Создание опроса";
    if (!auths.findAuthTokens()) {
        return window.location.replace(routes.auth.login);
    } else {
        return (
            <body className={classes.body_pages}>
                <Header />
                <CreateSelecter />
                <Footer />
            </body>
        );
    }
}
export default CreatePage;


