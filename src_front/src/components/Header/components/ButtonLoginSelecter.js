import { useEffect, useState } from "react";
import ButtonInput from './ButtonLoginComponents/ButtonIn';
import ButtonLive from "./ButtonLoginComponents/ButtonLive";

const ButtonLoginSelecter = (enter) => {
    if (String(enter.enter)==="Войти") {
        return (
            <ButtonInput/>
        )
    } else {
        return (
            <ButtonLive/>
        )
    }
}
export default ButtonLoginSelecter;
