import React from 'react';
import "./PlaceGrid.css";
import { Link } from 'react-router-dom';
export const PlaceGrid = ({place}) => {    
    return(
        <>
            <div className="topp">
                <div className="cajatopp">
                    <div className="perf">
                        <img src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} alt={place.name}></img><p>@{place.author.name}</p>
                    </div>
                </div>
                <div>
                    <h5>{ place.name }</h5>
                </div>
            </div>
            <div>
                <Link to={"/places/"+place.id} title="Veure"><img className="imgpub" src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} alt={place.name}/></Link>
            </div>
            <div className="funct">
                <div className="functizq">
                    <i className="bi bi-star"></i>
                    <i className="bi bi-chat"></i>
                    <i className="bi bi-share"></i>
                </div>
                <div className="functder">
                    <i className="bi bi-flag"></i>
                </div>
            </div>
            <div>
                <p>{ place.favorites_count } favs</p>
                <p>{ place.description }</p>
            </div>
            <div className="review">
                <div>
                    <p></p>
                </div>
                <div>
                    <i className="bi fa-2x bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                </div>
            </div>
        </>
    )
}

export default PlaceGrid