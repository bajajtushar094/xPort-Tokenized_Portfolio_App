import axios from "axios";
import jwt_decode from 'jwt-decode';
import { config, LOCAL_SERVER_URL } from "../config";

const configHeaders = localStorage.getItem('authTokens')?{
    headers: {
        'x-access-token': localStorage.getItem('authTokens')
    }
}:"";

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

                localStorage.setItem('authTokens', response.data.data.token)
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
                dispatch({
                    type:'LOGIN_USER',
                    user: response.data.data
                })

                
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

export const getAllPortfolioAPI = async (dispatch) => {
    try{
        const response = await axios.get(
            config().getAllPortfolio);

        if(response.status==200){
            try{
                console.log("Response from getAllPortfolio API: ", response);
            }
            catch(err){
                console.log("Error: ",err);
            }
        }

        return response;
    }
    catch(err){
        console.log("Error from getAllPortfolio APIs: ", err);
    }
}

export const addPortfolioAPI = async (portfolioData, dispatch) => {
    try{
        const response = await axios.post(config().addPortfolio, portfolioData);

        if(response.status==200){
            console.log("Response from addPortfolio API: ", response);
        }

        return response;
    }
    catch(err){
        console.log("Error from addPortfolio API: ", err);
    }
}