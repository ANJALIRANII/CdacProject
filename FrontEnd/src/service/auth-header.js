import axios from "axios";
import AuthService from "./auth.service";

export default function authHeader(props) {
    const user = JSON.parse(localStorage.getItem('user'));

    /*AuthService.verifyAccessToken().then((response) => {
        if (response.data.status === 902) {
            console.log("Access Token Expired")
            AuthService.getRefreshAccessToken().then((response) => {
                if (response.data.status === 902) {
                    console.log("refresh Token Expired")
                    props.history.push("/");
                    window.location.reload();
                } else {
                    const user = JSON.parse(localStorage.getItem('user'));
                    user.append('accessToken',response.data.accessToken)
                    localStorage.setItem("user", JSON.stringify(user));
                    
                }
            }, (error) => { console.log(error) })
        } else {
            return { Authorization: 'Bearer ' + user.accessToken };
        }
    })*/
    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}