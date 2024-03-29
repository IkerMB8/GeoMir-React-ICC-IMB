import { getPost } from "../posts/thunks";
import { setFavorito, setSuccess, setError, setPlaces, setPlace, startLoadingPlaces, setPage, setPages, setFilter } from "./placeSlice";

export const getPlaces = (page = 0, authToken) => {
    return async (dispatch, getState) => {
        let filter = getState().places.filter;
        dispatch(startLoadingPlaces());
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET", 
        };

        let url = page > 0
        ? "https://backend.insjoaquimmir.cat/api/places?paginate=1&page=" + page
        : "https://backend.insjoaquimmir.cat/api/places";
        let primsimbolo = page > 0 ? "&" : "?";
        let description = filter.description != "" ? "description="+filter.description : "";
        let author = filter.author != "" ? "author="+filter.author : "";
        if (description != "" && author != ""){
            url = url+primsimbolo+description+"&"+author;
        }else if (author != ""){
            url = url+primsimbolo+author;
        }else if (description != "" ){
            url = url+primsimbolo+description;
        }
        try {
            const data = await fetch(url, headers);
            const resposta = await data.json();
            if (resposta.success == true) {
                dispatch(setPlaces(resposta.data));
                if (page > 0) {
                    dispatch(setPlaces(resposta.data.collection));
                    dispatch(setPages(resposta.data.links));
                } else {
                    dispatch(setPlaces(resposta.data));
                }
            } else {
                dispatch(setError(resposta.message));
            }
        } catch (e) {
            dispatch(setError(e));
        }
    };
}

export const getPlace = (id, authToken) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingPlaces());
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET", 
        };
        const url = "https://backend.insjoaquimmir.cat/api/places/"+id
        try {
            const data = await fetch(url, headers);
            const resposta = await data.json();
            if (resposta.success == true) {
                dispatch(setPlace(resposta.data));
            } else {
                dispatch(setError(resposta.message));
            }
        } catch (e) {
            dispatch(setError(e));
        }
    };
}

export const delPlace = (id, authToken, navigate) => {
    return async (dispatch, getState) => {
        try {
            const data = await fetch("https://backend.insjoaquimmir.cat/api/places/"+id, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": 'Bearer '  + authToken,
            },
            method: "DELETE",
            })
            const resposta = await data.json();
            if (resposta.success == true) {
                console.log("Place Deleted Succesfully");
                dispatch(getPlaces(0,authToken));
            }else{
                console.log("Error eliminando place");
                dispatch(setError(resposta.message));
            }  
        } catch (e) {
            dispatch(setError(e));
        }
    };
};

export const addPlace = (place, authToken, navigate) => {
    let {name,description,upload,latitude,longitude,visibility=1}=place;
    var formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("upload", upload);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("visibility", visibility);

    return async (dispatch, getState) => {
        try {
            const data = await fetch("https://backend.insjoaquimmir.cat/api/places", {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                method: "POST",
                body: formData
            })
            const resposta = await data.json();
            if (resposta.success == true) {
                console.log("place Created Succesfully");
                dispatch(setSuccess("Place Creado Correctamente"));
                dispatch(getPlaces(0,authToken));
                dispatch(setSuccess(""));
                navigate("/places/"+resposta.data.id)
            }else{
                dispatch(setError(resposta.message));
            }
        } catch (e) {
            dispatch(setError(e));
        }
    };
}

export const editPlace = (place, authToken, id) => {
    let {name,description,upload,latitude,longitude,visibility}=place;
    var formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (upload != undefined){
        formData.append("upload", upload);
    }
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("visibility", visibility);

    console.log(place)
    return async (dispatch, getState) => {
        try {
            const data = await fetch("https://backend.insjoaquimmir.cat/api/places/"+id, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            method: "POST",
            body: formData
    
            })
            const resposta = await data.json();
            if (resposta.success == true) {
                console.log("Place Edited Succesfully");
                dispatch(setSuccess("Place Editado Correctamente"));
                dispatch(getPlaces(0,authToken));
                dispatch(getPlace(id,authToken));
            }else{
                dispatch(setError(resposta.message));
            }
        } catch (e) {
            dispatch(setError(e));
        }
    };
}

export const favorite = (id, authToken) => {
    return async (dispatch, getState) => {
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "POST", 
        };
        const url = "https://backend.insjoaquimmir.cat/api/places/"+id+"/favorites";
        try {
            const data = await fetch(url, headers);
            const resposta = await data.json();
            if (resposta.success == true) {
                dispatch(setFavorito(true));
                dispatch(getPlace(id,authToken));
            } else {
                console.log("Ya tienes en favoritos este lugar");
            }
        } catch (e) {
            dispatch(setError(e));
        }
    };
}

export const unfavorite = (id, authToken) => {
    return async (dispatch, getState) => {
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "DELETE", 
        };
        const url = "https://backend.insjoaquimmir.cat/api/places/"+id+"/favorites";
        try {
            const data = await fetch(url, headers);
            const resposta = await data.json();
            if (resposta.success == true) {
                dispatch(setFavorito(false));
                dispatch(getPlace(id,authToken));
            } else {
                console.log("No tienes en favoritos este lugar");
            }
        } catch (e) {
            dispatch(setError(e));
        }
    };
}

export const comprobarFavorito = (id, authToken) => {
    return async (dispatch, getState) => {
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "POST", 
        };
        const url = "https://backend.insjoaquimmir.cat/api/places/"+id+"/favorites";
        try {
            const data = await fetch(url, headers);
            const resposta = await data.json();
            if (resposta.success == true) {
                dispatch(unfavorite(id, authToken));
            }else{
                dispatch(setFavorito(true));
            }
        } catch (e) {
            dispatch(setError(e));
        }
    };
}