import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../../components/Sidebar'
import Feed from '../../components/Feed'
import Rightbar from '../../components/Rightbar'
import styles from '../../styles/Profile.module.css'
import {useRouter} from 'next/router'
import axios from 'axios'
import { useState, useEffect } from 'react'
import baseUrl from '../../components/base/baseUrl'

export default function Profile ({user, CUP, CN, CA}) {

    const [ userr, setUserr ] = useState({})
    const router = useRouter()

    useEffect( () => {
      
        const getUsers = async () => {
       
           try {
              const res = await axios.get( `${baseUrl}/api/users?username=${user}` )
              
              setUserr(res.data.other)  
           } 
           catch (error) {
             console.log(error)
           } 
        }
        getUsers()
      },[user] )

      useEffect( () => {
      
        const getUsers = async () => {
       
           try {
             const res = await axios.get("/api/getuser")
            
             if(Object.keys(res.data).length < 1){
                router.push("/login")
             }
           } 
           catch (error) {
             console.log(error)
           } 
        }
        getUsers()
      },[] )

     //const router = useRouter()
    // const username = router.query.id

  return (
            <> 
             <Head>
                <title> Social Media App/Profile </title>
             </Head>
                <div className={styles.profile} >
                    <Sidebar/>
                    <div className={styles.profileright} >
                        <div className={styles.profilerighttop}>
                            <div className={styles.profilecover}  >
                               <img className={styles.profilecoverimg} src={userr.coverPicture ? userr.coverPicture : "/images/nocover2.png" } alt='' />
                               <img className={styles.profileuserimg} src={userr.profilePicture ? userr.profilePicture : "/images/nocover2.png" } alt='' />
                            </div> 
                            <div className={styles.profileinfo} >
                                <h4 className={styles.profileinfoname} > {userr.username} </h4>
                                <span className={styles.profileinfodesc} > {userr.description} </span>
                            </div>
                        </div>
                        <div className={styles.profilerightbottom}>
                            <Feed username={user} CUP={CUP} CN={CN} CA={CA} />
                            <Rightbar userr={userr} user={user} />
                        </div>                       
                    </div>                  
                </div>   
            </>
  )
}

export async function getServerSideProps (context) {
   
    const username = context.params.id 
    let CLOUD_UPDATE_PRESET = process.env.CLOUD_UPDATE_PRESET
    let CLOUD_NAME  = process.env.CLOUD_NAME
    let CLOUD_API = process.env.CLOUD_API

    return {
        props: {
          user: username,
          CUP : CLOUD_UPDATE_PRESET,
          CN :  CLOUD_NAME,
          CA : CLOUD_API
        }
    }
  
  }