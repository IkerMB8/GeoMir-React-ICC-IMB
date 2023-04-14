import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../userContext";

export default function doLogin() {
    let [error, setError] = useState("");
    let {authToken, setAuthToken, usuari, setUsuari, idUsuari, setIdUsuari} = useContext(UserContext);

    const checkAuthToken = async () => {
        if (sessionStorage.getItem('token')){
            try {
                const data = await fetch("https://backend.insjoaquimmir.cat/api/user", {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer '  + sessionStorage.getItem('token'),
                    },
                        method: "GET",
                    })
                    const resposta = await data.json();
                    // console.log(resposta)
                if (resposta.success === true) {
                    setAuthToken(sessionStorage.getItem('token'));
                    setUsuari(resposta.user.email);
                    setIdUsuari(resposta.user.id);
                    // console.log(resposta.user.email)
                }else{
                    console.log("La resposta no ha triomfat");
                }            
            } catch {
                console.log("Error");
            }
        };
    }
    useEffect(()=>{
        checkAuthToken()
    }, []);

    
  const doLogin = async (e, email, password) => {
    e.preventDefault();
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/login", {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      const resposta = await data.json();
      if (resposta.success === true){
        setAuthToken(resposta.authToken);
        setUsuari(email);
        if (! sessionStorage.getItem('token')){
          sessionStorage.setItem('token', resposta.authToken);
        }
        checkAuthToken();
      }else{ 
        setError(resposta.message);
        // else alert("La resposta no ha triomfat");
      }
      // alert("He enviat les Dades:  " + email + "/" + password);
    } catch {
      console.log("Error");
      //alert("catch");
    }
  };

  return { doLogin, error, setError };
}