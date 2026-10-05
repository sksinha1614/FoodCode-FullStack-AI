import axios from "axios";

const API_URL ="http://localhost:8080/api";

export const registerUser=async(userData)=>{
    try{
        const response=await axios.post(API_URL+"/register",userData);
        return response;
    }
    catch(error){
        console.log('Error registering user', error);
        throw error;
    }
}

export const loginUser=async(userData)=>{
    try{
        const response=await axios.post(API_URL+"/login",userData);
        return response;
    }
    catch(error){
        console.log('Error logging in user', error);
        throw error;
    }
}

