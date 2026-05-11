import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

export default function AppProtectedRoutes({children}) {
    //  const userToken = localStorage.getItem("token");
     const{token} = useContext(AuthContext);
     const navigate = useNavigate();
    useEffect(()=>{
        if(!token){
            navigate("/login");
        }
    },[token]);
    return children;
}
