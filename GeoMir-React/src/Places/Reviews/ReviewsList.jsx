import React from 'react';
import { UserContext } from "../../userContext";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewAdd from "./ReviewAdd";
import Review from "./Review";

export default function ReviewsList() {
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  let [ reviews, setReviews ] = useState([]);
  const { id } = useParams();
  let [ reviewAdd, setReviewAdd ] = useState(false);
  let [refresh,setRefresh] = useState(false);

  const getReviews = async (e) => {
    try {
        const data = await fetch("https://backend.insjoaquimmir.cat/api/places/"+id+"/reviews", {
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": 'Bearer '  + authToken,
            },
            method: "GET",
        })
        const resposta = await data.json();
        console.log(resposta);
        if (resposta.success == true){
            console.log(resposta.data); 
            resposta.data.map((review) => {
              if (usuari == review.user.email){
                setReviewAdd(true);
              }
            });
            setReviews(resposta.data);
        }else{
            console.log("La resposta no ha triomfat");
        }            
    } catch {
      console.log("Error");
    }
  };

  useEffect(()=>{
    getReviews();
  }, [refresh])
    
  const deleteReview = async (e, idrev) => {
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places/"+id+"/reviews/"+idrev, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": 'Bearer '  + authToken,
        },
        method: "DELETE",
    })
      const resposta = await data.json();
      console.log(resposta);
      if (resposta.success == true){
        setRefresh(!refresh);
        setReviewAdd(false);
      }else{
        console.log("Error eliminando la review");
        console.log(resposta.message);
      }            
    } catch {
      console.log("Error");
    }
  };

  return(
    <>
      <div className="contenido">
        <div className="comments-container">
          <h1>Reviews Place {id}</h1>
          <ul>
          {reviews.map((review) => (  
            (<li key={review.id} id="comments-list" className="comments-list"><Review review={review} deleteReview={deleteReview}/></li>)
          ))} 
          </ul>
        </div>
      </div>
      {reviewAdd == false &&
        <div><ReviewAdd refresh={refresh} setRefresh={setRefresh}/></div> 
      }
    </>
  );
}