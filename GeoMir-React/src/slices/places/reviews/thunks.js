import { setAdd, setError, setReviews, setReviewsCount, startLoadingReviews, setPage, setPages } from "./reviewSlice";

export const getReviews = (page = 0, id, authToken, usuari="") => {
    return async (dispatch, getState) => {
        dispatch(startLoadingReviews());
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET", 
        };
        let url = page > 0
        ? "https://backend.insjoaquimmir.cat/api/places/"+id+"/reviews?paginate=1&page=" + page
        : "https://backend.insjoaquimmir.cat/api/places/"+id+"/reviews";
        const data = await fetch(url, headers );
        const resposta = await data.json();
        if (resposta.success == true) {
            if (page > 0) {
                dispatch(setReviews(resposta.data.collection));
                dispatch(setPages(resposta.data.links));
                resposta.data.collection.map((v) => {
                    if (v.user.email === usuari) {
                        dispatch (setAdd(false));
                        console.log("Te review");
                    }
                });
            } else {
                dispatch(setReviews(resposta.data));
                resposta.data.map((v) => {
                    if (v.user.email === usuari) {
                        dispatch (setAdd(false));
                        console.log("Te review");
                    }
                });
            }
        } else {
            dispatch(setError(resposta.message));
        }
    };
}

export const delReview = (review, authToken) => {
    return async (dispatch, getState) => {
        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/places/" +
            review.place.id +
            "/reviews/" +
            review.id,
            {
                headers: {   
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authToken,
                },
                method: "DELETE",
            }
        );
        const resposta = await data.json();
        if (resposta.success == true) {
            console.log("Review Deleted Succesfully");
            dispatch(setAdd(true));
            // usuari no l'indiquem i per defecta estarà a ""
            dispatch(getReviews(0,review.place.id,authToken))
            const state = getState()
            dispatch(setReviewsCount(state.reviewsCount - 1));
        }
    };
};

export const addReview = (id, data, authToken) => {
    let review = data.review;
    return async (dispatch, getState) => {
        const data = await fetch("https://backend.insjoaquimmir.cat/api/places/"+id+"/reviews", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "POST",
            body: JSON.stringify({review})
        })
        const resposta = await data.json();
        console.log(resposta)
        if (resposta.success == true) {
            console.log("Review Created Succesfully");
            dispatch(setAdd(false));
            // usuari no l'indiquem i per defecta estarà a ""
            dispatch(getReviews(0,id,authToken))
            const state = getState()
            dispatch(setReviewsCount(state.reviewsCount + 1));
        }else{
            setError(resposta.message)
        }
    };
}