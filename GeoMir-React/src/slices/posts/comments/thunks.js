import { setAdd, setError, setComments, setCommentsCount, startLoadingComments } from "./CommentSlice";

export const getComments = (page = 0, id, authToken, usuari="") => {
    return async (dispatch, getState) => {
        dispatch(startLoadingComments());
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET", 
        };
        const url = "https://backend.insjoaquimmir.cat/api/posts/" + id + "/comments"
        const data = await fetch(url, headers );
        const resposta = await data.json();
        if (resposta.success == true) {
            dispatch(setComments(resposta.data));
        } else {
            dispatch(setError(resposta.message));
        }
        resposta.data.map((v) => {
            if (v.user.email === usuari) {
                dispatch (setAdd(false));
                console.log("Te comment");
            }
        });
    };
}

export const delComment = (comment, authToken) => {
    return async (dispatch, getState) => {
        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/posts/" +
            comment.post.id +
            "/comments/" +
            comment.id,
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
            console.log("Comment Deleted Succesfully");
            dispatch(setAdd(true));
            // usuari no l'indiquem i per defecta estarà a ""
            dispatch(getComments(0,comment.post.id,authToken))
            const state = getState()
            dispatch(setCommentsCount(state.commentsCount - 1));
        }
    };
};

export const addComment = (id, comment, authToken) => {
    return async (dispatch, getState) => {
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/"+id+"/comments", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "POST",
            body: JSON.stringify({comment})
        })
        const resposta = await data.json();
        console.log(resposta)
        if (resposta.success == true) {
            console.log("Comment Created Succesfully");
            dispatch(setAdd(false));
            // usuari no l'indiquem i per defecta estarà a ""
            dispatch(getComments(0,id,authToken))
            const state = getState()
            dispatch(setCommentsCount(state.commentsCount + 1));
        }else{
            setError(resposta.message)
        }
    };
}