import React, { useState } from 'react';
import { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import DateTimeForSurveyTest from './DateTimeForSurveyTest';
import Button from '@material-ui/core/Button';
import  { useEffect, useRef } from "react";
import CreateSimplePoll from "./CreateSimplePoll";
class  CreatePoll  extends  Component {



    render() {
        return (      
           
            <div className="main-page">
                <CreateSimplePoll />                
            </div>        
            );          
      }
      componentDidMount() {
        document.title = "Создание опроса";
      }
    }
    export  default  CreatePoll;



