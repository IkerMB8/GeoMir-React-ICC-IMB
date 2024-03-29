import { setLike, setSuccess, setError, setPosts, setPost, startLoadingPosts, setPage, setPages, setFilter } from "./postSlice";

export const getPosts = (page = 0, authToken) => {
    return async (dispatch, getState) => {
        let filter = getState().posts.filter;
        dispatch(startLoadingPosts());
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET", 
        };

        let url = page > 0
        ? "https://backend.insjoaquimmir.cat/api/posts?paginate=1&page=" + page
        : "https://backend.insjoaquimmir.cat/api/posts";
        let primsimbolo = page > 0 ? "&" : "?";
        let body = filter.body != "" ? "body="+filter.body : "";
        let author = filter.author != "" ? "author="+filter.author : "";
        if (body != "" && author != ""){
            url = url+primsimbolo+body+"&"+author;
        }else if (author != ""){
            url = url+primsimbolo+author;
        }else if (body != "" ){
            url = url+primsimbolo+body;
        }
        try{
            const data = await fetch(url, headers);
            const resposta = await data.json();
            if (resposta.success == true) {
                dispatch(setPosts(resposta.data));
                if (page > 0) {
                    dispatch(setPosts(resposta.data.collection));
                    dispatch(setPages(resposta.data.links));
                } else {
                    dispatch(setPosts(resposta.data));
                }
            } else {
                dispatch(setError(resposta.message));
            }
        } catch (e) {
            dispatch(setError(e));
        }
    };
}

export const getPost = (id, authToken) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingPosts());
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET", 
        };
        const url = "https://backend.insjoaquimmir.cat/api/posts/"+id
        try{
            const data = await fetch(url, headers);
            const resposta = await data.json();
            if (resposta.success == true) {
                dispatch(setPost(resposta.data));
            } else {
                dispatch(setError(resposta.message));
            }
        } catch (e) {
            dispatch(setError(e));
        }
    };
}

export const delPost = (id, authToken) => {
    return async (dispatch, getState) => {
        try{
            const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/"+id, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": 'Bearer '  + authToken,
            },
            method: "DELETE",
            })
            const resposta = await data.json();
            if (resposta.success == true) {
                console.log("Post Deleted Succesfully");
                dispatch(getPosts(0,authToken))
            }else{
                console.log("Error eliminando Post");
                dispatch(setError(resposta.message));
            }  
        } catch (e) {
            dispatch(setError(e));
        }
    };
};

export const addPost = (post, authToken, navigate) => {
    let {body,upload,latitude,longitude,visibility=1}=post;
    var formData = new FormData();
    formData.append("body", body);
    formData.append("upload", upload);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("visibility", visibility);

    return async (dispatch, getState) => {
        try{
            const data = await fetch("https://backend.insjoaquimmir.cat/api/posts", {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            method: "POST",
            body: formData
    
            })
            const resposta = await data.json();
            if (resposta.success == true) {
                console.log("Post Created Succesfully");
                dispatch(setSuccess("Post Creado Correctamente"));
                dispatch(getPosts(0,authToken));
                dispatch(setSuccess(""));
                navigate("/posts/"+resposta.data.id)
            }else{
                dispatch(setError(resposta.message));
            }
        } catch (e) {
            dispatch(setError(e));
        }
    };
}

export const editPost = (post, authToken, id) => {
    let {body,upload,latitude,longitude,visibility}=post;
    var formData = new FormData();
    formData.append("body", body);
    if (upload != undefined){
        formData.append("upload", upload);
    }
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("visibility", visibility);

    console.log(post)
    return async (dispatch, getState) => {
        try{
            const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/"+id, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            method: "POST",
            body: formData
    
            })
            const resposta = await data.json();
            if (resposta.success == true) {
                console.log("Post Edited Succesfully");
                dispatch(setSuccess("Post Editado Correctamente"));
                dispatch(getPosts(0,authToken));
                dispatch(getPost(id,authToken));
            }else{
                dispatch(setError(resposta.message));
            }
        } catch (e) {
            dispatch(setError(e));
        }
    };
}

export const likePost = (id, authToken) => {
    return async (dispatch, getState) => {
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "POST", 
        };
        const url = "https://backend.insjoaquimmir.cat/api/posts/"+id+"/likes";
        try{
            const data = await fetch(url, headers);
            const resposta = await data.json();
            if (resposta.success == true) {
                dispatch(setLike(true));
                dispatch(getPost(id, authToken));
            } else {
                console.log("Ya has dado like a este post");
            }
        } catch (e) {
            dispatch(setError(e));
        }
    };
}

export const unlike = (id, authToken) => {
    return async (dispatch, getState) => {
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "DELETE", 
        };
        const url = "https://backend.insjoaquimmir.cat/api/posts/"+id+"/likes";
        try{
            const data = await fetch(url, headers);
            const resposta = await data.json();
            if (resposta.success == true) {
                dispatch(setLike(false));
                dispatch(getPost(id, authToken));
            } else {
                console.log("No has dado like a este post");
            }
        } catch (e) {
            dispatch(setError(e));
        }
    };
}

export const comprobarLike = (id, authToken) => {
    return async (dispatch, getState) => {
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "POST", 
        };
        const url = "https://backend.insjoaquimmir.cat/api/posts/"+id+"/likes";
        try{
            const data = await fetch(url, headers);
            const resposta = await data.json();
            if (resposta.success == true) {
                dispatch(unlike(id, authToken));
            }else{
                dispatch(setLike(true));
            }
        } catch (e) {
            dispatch(setError(e));
        }
    };
}