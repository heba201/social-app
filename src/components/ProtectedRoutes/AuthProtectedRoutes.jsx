import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

export default function AuthProtectedRoutes({children}) {
    // const userToken = localStorage.getItem("token");
    const{token} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(()=>{
        if(token){
            navigate("/");
        }
    },[token]);
    return children;
}
