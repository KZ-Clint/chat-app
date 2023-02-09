import axios from 'axios'
import baseUrl from '../base/baseUrl'


export const loginCall = async (userCredential, dispatch, router) => {
    
    dispatch({ type: "LOGIN_START" })
    try{
       const res = await axios.post(`${baseUrl}/api/auth/login`, userCredential )
       dispatch({ type:"LOGIN_SUCCESS", payload:res.data.user })
       const toke =  await axios.post("/api/login",{
        token: res.data.access_token   
    }) 
    localStorage.setItem('userd', JSON.stringify(res.data.user))
    router.push("/")
    console.log(toke)
    } catch (err) {
        console.log(err.response.data.error)
        dispatch({ type:"LOGIN_FAILURE", payload:err.response.data.error })
    }
}