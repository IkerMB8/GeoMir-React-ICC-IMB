import React from 'react';
import { UserContext } from "../../userContext";
import { useContext, useState, useEffect } from "react";
import ReviewAdd from "./ReviewAdd";
import Review from "./Review";
import { useDispatch, useSelector } from "react-redux";
import { setReviewsCount } from "../../slices/places/reviews/reviewSlice";
import { getReviews } from "../../slices/places/reviews/thunks";

export const ReviewsList = ({ id, reviews_count }) => {
  let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);
  const dispatch = useDispatch();
  const { reviews=[], page=0, isLoading=true, add=true, error="", reviewsCount=0 } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(setReviewsCount(reviews_count))
    dispatch(getReviews(0, id, authToken,usuari));
  }, []);

  return(
    <>
      <div className="contenido">
        <div className="comments-container">
          <h1>Reviews Place {id}</h1>
          <ul>
          {reviews.map((review) => (  
            (<li key={review.id} id="comments-list" className="comments-list"><Review review={review}/></li>)
          ))} 
          </ul>
        </div>
      </div>
      {add == true &&
        <div><ReviewAdd id={id}/></div> 
      }
    </>
  );
}

export default ReviewsList