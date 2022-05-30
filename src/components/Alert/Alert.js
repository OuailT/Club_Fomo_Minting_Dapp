import React, {useEffect} from "react";
import "../Header/Header.css";


const Alert = ({removeAlert, msg}) => {

    useEffect(()=> {
        const time = setTimeout(()=> {
            removeAlert();
        },10000)

        return ()=> clearTimeout(time);
    },[])


    return (
        <p className="alert">{msg}</p>
    )
}



export default Alert;




