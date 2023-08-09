import axios from "axios";
import jwt_decode from 'jwt-decode';
import { config, LOCAL_SERVER_URL } from "../config";

// const configHeaders = localStorage.getItem('authTokens')?{
//     headers: {
//         'token': `${JSON.parse(localStorage.getItem('authTokens')).access}`
//     }
// }:"";

export const registerUserAPI = async (registerData, dispatch)=>{
    try{
        console.log("Register Data: ", registerData);
        const response = await axios.post(
            config().register,
            registerData
        );
        console.log("Response from register user api: ", response);
        if(response.status==200){
            try{
                dispatch({
                    type:'LOGIN_USER',
                    user: response.data.data
                })

                localStorage.setItem('authTokens', JSON.stringify(response.data.data.token))
            }
            catch(err){
                console.log("Error: ", err);
            }
        }

        return response;
    }
    catch(err){
        console.log("Error from Register User API: ", err);
    }
}


export const loginUserAPI = async (loginData, dispatch)=>{
    try{
        console.log("Register Data: ", loginData);
        const response = await axios.post(
            config().login,
            loginData
        );
        
        if(response.status==200){
            try{
                console.log("Response from login user api: ", response);
            }
            catch(err){
                console.log("Error: ", err);
            }
        }

        return response;
    }
    catch(err){
        console.log("Error from Register User API: ", err);
    }
} 