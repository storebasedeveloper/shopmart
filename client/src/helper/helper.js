/* Make API Requests */
import axios from "axios"
export async function authenticate(email){
    try{
return axios.post
    }catch(error){
        return {error : "email does not exist"}    }
}

/* Get  User Details */



/*Register user function*/
export async function registerUser(Credentials){
    try{
const  {data, status} = await axios.post(`/api/user/register`, Credentials)
let { email } = Credentials
    }catch(error){
        return Promise.reject( { error })
    }
}
/* Login functionality
export async function registerUser(Credentials){