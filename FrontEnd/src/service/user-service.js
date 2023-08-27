import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/user";

//const currentUser = getCurrentUser();
const getUserProfile = (username) => {

  const header = authHeader()
  return axios({
    method: 'post',
    url: API_URL + `/profile`,
    //headers: { header },
    data: {
      'username': username
    }
  });
};

const setUserProfile = (data) => {
  return axios({
    method: 'post',
    url: API_URL + `/add/profile`,
    //headers: { header },
    data: data 
  });
}

export default {
  getUserProfile, setUserProfile
};