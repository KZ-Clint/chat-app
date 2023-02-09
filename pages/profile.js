import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/Feed'
import Rightbar from '../components/Rightbar'
import Sidebar from '../components/Sidebar'
import styles from '../styles/Profile.module.css'


export default function Profile () {
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
                               <img className={styles.profilecoverimg} src="/images/metamask.png" alt='' />
                               <img className={styles.profileuserimg} src="/images/metamask.png" alt='' />
                            </div> 
                            <div className={styles.profileinfo} >
                                <h4 className={styles.profileinfoname} > Ogbonna Clinton </h4>
                                <span className={styles.profileinfodesc} > Hello boss </span>
                            </div>
                        </div>
                        <div className={styles.profilerightbottom}>
                            <Feed/>
                            <Rightbar profile />
                        </div>                       
                    </div>                  
                </div>   
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
        const response = await fetch( `${baseUrl}/api/users/loggeduser`, {  headers: {
          'Authorization': `Bearer ${tokenReq} `
        }})
         userData = await response.json()
       }  
  
    return {
        props: {
          token: tokenReq,
          userdata: userData 
        }
    }
  }