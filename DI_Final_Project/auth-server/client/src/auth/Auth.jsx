import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import axios from 'axios';
import LoginRegister from "../assets/components/LoginRegister";
import { Link } from "react-router-dom";

const Auth = ({children, msg}) => {
    const [redirect, setRedirect] = useState(false);
    const {token, setToken} = useContext(AuthContext);

    useEffect(()=>{
        verify();
    },[])
    
    const verify = async() => {
        try {
            const response = await axios.get("http://localhost:5000/user/auth", {
            withCredentials: true,
            headers: {
                "x-access-token": token
            },
        })

        if(response.status ===200) {
            setToken(response.data.accessToken);
            setRedirect(true);
        }
     } catch (error) {
            console.log(error);
            setToken(null)
            setRedirect(false)
        }
    }
    console.log(redirect);

    return redirect ? children : <h2> <Link to ="/login">{msg}</Link> </h2>;
};

export default Auth 