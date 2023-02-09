import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddHomeIcon from '@mui/icons-material/AddHome'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Rightbar from '../components/Rightbar'
import axios from 'axios'
import baseUrl from '../components/base/baseUrl'

export default function Home({token,userdata, CUP,CN,CA}) {
  

  return (
    <>
      <Head>
        <title> Social Media App </title>
      </Head>
        <div className={styles.homecontainer} >
          <Sidebar/>
          <Feed CUP={CUP} CN={CN} CA={CA} />
          <Rightbar token={token} />
        </div>    
        {/* <Feed/> */}
    </>
  )
}

export async function getServerSideProps ({req,res}) {
  let tokenReq= {}
  let userData = {}
  if(req.cookies.token){
      tokenReq=JSON.parse(req.cookies.token)     
  } else {
    return {
      redirect:{
        permanent:false,
        destination:"/login"
      }
    }
  }
  if (Object.keys(tokenReq).length > 0 ) {
    const response = await fetch( `${baseUrl}/api/users/logged`, {  headers: {
      'Authorization': `Bearer ${tokenReq} `
    }})
     userData = await response.json()
   }  
   let CLOUD_UPDATE_PRESET = process.env.CLOUD_UPDATE_PRESET
   let CLOUD_NAME  = process.env.CLOUD_NAME
   let CLOUD_API = process.env.CLOUD_API

  return {
      props: {
        token: tokenReq, 
        userdata: userData,
        CUP : CLOUD_UPDATE_PRESET,
        CN :  CLOUD_NAME,
        CA : CLOUD_API  
      }
  }
}
