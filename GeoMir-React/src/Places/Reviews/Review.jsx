import React from 'react';
import { UserContext } from "../../userContext";
import { useContext } from "react";
import "./review.css";
import TimeAgo from 'react-timeago';
import spanishStrings from 'react-timeago/lib/language-strings/es';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

export const Review = ({review, deleteReview}) => {   
    const formatter = buildFormatter(spanishStrings); 
    let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
    return(
        <>
                <div className="comment-main-level">
                    <div className="comment-avatar">
                        <img src="https://hope.be/wp-content/uploads/2015/05/no-user-image.gif" alt="" />
                    </div>
                    <div className="comment-box">
                        <div className="comment-head">
                            <h6 className="comment-name">{review.user.name}</h6>
                            <span><TimeAgo date={review.created_at} formatter={formatter} /></span>
                            {usuari == review.user.email &&
                                <button onClick={(e) => {deleteReview(e, review.id);}} className="delete iconos reviewdelete" title="Eliminar" type="submit"><i className="bi bi-trash3"></i></button>
                            }
                        </div>
                        <div className="comment-content">
                            {review.review}
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Review
