import axios from "axios";

const API_URL = "http://localhost:8080";

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}
const register = (firstName, lastname, email, password, mobileNo) => {
  
  // return axios({
  //   method: 'post',
  //   url: API_URL + '/adduser',
  //   /*  headers: {}, */
  //   data: {
  //     'firstName': firstName,
  //     'lastname': lastname,
  //     'email': email,
  //     'password': password,
  //     'mobileNo':mobileNo
  //   }
  // });
  return 

}

const loginInfo=()=>{

}

const login = async (username, password) => {
  // const params = new URLSearchParams()
  // params.append('email', username)
  // params.append('password', password)
   //const dispatch = useDispatch();

  const payload={
    "email":username,
    "password":password
  }

  const response = await axios
    .post(API_URL + "/authenticate", payload, config);
  if (response.status===200) {
    // localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("user", JSON.stringify(response.data.userdto));
    localStorage.setItem("userId", response.data.userdto.id);
    localStorage.setItem("firstName", response.data.userdto.firstName);
    localStorage.setItem("token", response.data.jwt);
    localStorage.setItem("role", response.data.userdto.role);
    const token = response.data.jwt;
    //localStorage.setItem("state",)
    //settingtocken(token);
    
    // if(response.data.userdto.role=="USER")
    //   navigate("/user")
    // if(response.data.userdto.role=="ADMIN")
    //   navigate("/admin")
    // if(response.data.userdto.role=="VENDOR")
    //   navigate("/vendor")
  }
  return response.data;
};

// const logout = () => {
//   localStorage.removeItem("user");
//};

const getCurrentUser = () => {
  return (localStorage.getItem("user"));
};

/*const verifyAccessToken = () => {
  return axios.get(API_URL + "/verify/accessToken?token=" + getCurrentUser().accessToken)
}

const getRefreshAccessToken = () => {
  const refreshToken = getCurrentUser().refreshToken
  return axios({
    method: 'post',
    url: API_URL + "/token/refresh",
    headers: { Authorization: 'Bearer ' + refreshToken },
    data: {
    }
  });
}*/

export default {
  register,
  login,
  //logout,
  getCurrentUser,
  //verifyAccessToken, 
  //getRefreshAccessToken
};