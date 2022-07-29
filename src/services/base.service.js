import axios from "axios";
import store from "../store"

export const authHeader = () =>{
    const currentUser = store.getState().user;

    return {
        "Content-Type":"application/json",
        "authorization":"Bearer "+currentUser?.token
    }
}

export function handleResponseWithLoginCheck(){
    axios.interceptors.response.use(res => res,err =>{
        const currentUser = store.getState().user;
        const isLoggedIn = currentUser.token;
        const status = err?.res?.status;

        if (isLoggedIn && [401,403].includes(status)){
            store.dispatch(clearCurrentUser())
            history.push("/login")
        }

        return Promise.reject(err);
    })
}