import { Component, useEffect } from "react";
import Button from '@mui/material/Button';

const ButtonLive = () => {
    const enter = "Выйти";
    const href = "/auth/logout/";
    const properties_button = { 
        my: 2, color: 'blue', 
        backgroundColor: "white", 
        display: 'block' 
    };

    return (
        <Button id='ButtonLogin' key={enter} sx={properties_button} variant="contained" href={href}>
            {enter}
        </Button>
    );
}
export default ButtonLive;