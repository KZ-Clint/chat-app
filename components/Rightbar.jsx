import Image from 'next/image'
import {useRouter} from 'next/router'
import styles from '../styles/Rightbar.module.css'
import { Users } from './Dummydata'
import Online from './subcomp/Online'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Link from 'next/link'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import baseUrl from './base/baseUrl'
import { AuthContext } from './context/Authcontext'


export default function Rightbar ({token,userr, user}) {

   const[ followers, setFollowers ] = useState([])
   const { user:currentUser } = useContext(AuthContext)
   const router = useRouter()
   
   const[ followed, setFollowed ] = useState(false)

  
     useEffect( () => {
      if(currentUser && userr ){ 
           setFollowed(currentUser.followings.includes(userr._id) ? true :false )

      }
   },[currentUser, userr] )
   const handleClick = async () => {
       try{
           if(!followed) {
           const res = await axios.put( `${baseUrl}/api/users/${userr._id}/follow`, {userId:currentUser._id} )
         
           setFollowed(!followed)
           }
           else {
            const res = await axios.put( `${baseUrl}/api/users/${userr._id}/unfollow`, {userId:currentUser._id} )
            
            setFollowed(!followed)
           }
       } catch(err) {
           console.log(err.response.data.error)
       }
       
   }

   useEffect( () => {
     const getFollowers = async () => {  
    
      if ( router.asPath === `/profile/${user}`) { 
         console.log("after get followers")   
         try {
            const res = await axios.get( `${baseUrl}/api/users/friends/friends/${userr._id}` )
         
            setFollowers(res.data.friendList)
         } 
         catch (error) {
           console.log(error)
         } 
      } 
   }
     getFollowers()

   },[userr, user] )
 
  const HomeRightBar = () => {
    return(
     
      <>
        {  router.asPath !== `/profile/${user}` ? 
        <>
           <div className={styles.birthdaycontainer} >
                   <img className={styles.birthdayimg}  src="/images/giftopen.svg" alt="" /> 
                   <span className={styles.birthdaytext} > 
                     <b>Pola Foster</b>  and <b> 3 other friends </b> have a birthday today
                   </span>
               </div>
               <img className={styles.rightbarad} src='/images/accessbank2.png' alt='' />
               <h4 className={styles.rightbartitle} > Online Friends </h4>
               <ul className={styles.rightbarfriendlist} >
                { Users.map( (user) => (
                    <Online key={user.id} user={user} />
                ) ) }
                  
               </ul> 
               </> : 
              
                    <>
                    { currentUser && 
                      <div>
                     {  currentUser.username !== user ? (  
                        <button className={styles.rightbarfollowbutton} onClick={handleClick} >
                          { followed ? "Unfollow" : "Follow" } 
                          { followed ? <RemoveIcon/> : <AddIcon/> }
                        </button> 
                    ): <p> </p>  }
                     <h4 className={styles.rightbartitle} > User Information </h4>
                     <div className={styles.rightbarinfo} >
                        <div className={styles.rightbarinfoitem} >
                           <span className={styles.rightbarinfoitem} > City: </span>
                           <span className={styles.rightbarinfoitem} > {userr.city}</span>
                        </div>
                        <div className={styles.rightbarinfoitem} >
                           <span className={styles.rightbarinfoitem} > From: </span>
                           <span className={styles.rightbarinfoitem} > {userr.from} </span>
                        </div>
                        <div className={styles.rightbarinfoitem} >
                           <span className={styles.rightbarinfoitem} > Relationship: </span>
                           <span className={styles.rightbarinfoitem} > {userr.relationship === 1 ? "single" : userr.relationship === 2 ? "Married" : "Empty"  } </span>
                        </div>
                     </div>
                     <h4 className={styles.rightbartitle} > User Friends </h4>
                        <div className={styles.rightbarfollowings} >
                           { followers.map( (following) => (  
                              <Link href={`/profile/${following.username}`} key={following._id} >
                                <div className={styles.rightbarfollowing} key={following._id} >
                                  <img src={ following.profilePicture ? following.profilePicture : "/images/nocover2.png" } alt="" className={styles.rightbarfollowingimg} />
                                  <span className={styles.rightbarfollowingname} > {following.username} </span>
                                </div>  
                              </Link>  
                           ) ) }                             
                        </div> 
                        </div> }
                     </> 
                      }
      </> 
    )
  }

  return (
    <>
       <div className={styles.rightbar} >
           <div className={styles.rightbarwrapper} >
             {HomeRightBar()}
           </div>
       </div>
    </>
  )
}
