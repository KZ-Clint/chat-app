import Image from 'next/image'
import styles from '../../styles/Chatonline.module.css'
import { useState, useEffect, useContext } from 'react'
import baseUrl from '../base/baseUrl'
import axios from 'axios'


export default function Chatonline ({ onlineUsers, currentId, setCurrentChat }) {
  
  const [ friends, setFriends ] = useState([])
  const [ onlineFriends, setOnlineFriends ] = useState([])

  useEffect( () => {
    const getFollowers = async () => {  
         try {
            const res = await axios.get( `${baseUrl}/api/users/friends/friends/${currentId}` )
        
            setFriends(res.data.friendList)
         } 
         catch (error) {
           console.log(error)
         } 
   }
     getFollowers()
  },[currentId] )

  useEffect( () => {
    setOnlineFriends( friends.filter( (f) => {
      return onlineUsers.includes(f._id)
    } ) )
  },[friends, onlineUsers] )

  const handleClick = async(user)=> {
     try{
        const res = await axios.get( `${baseUrl}/api/conversation/find/${currentId}/${user._id}` )
      
        setCurrentChat(res.data.convo)
     } catch (err) {
       console.log(err)
     }
  }
 
  return (
    <> 
      <div className={styles.chatonline} >
        { onlineFriends.map( (o) => (  
          <div className={styles.chatonlinefriend} key={o._id} onClick={ () => {handleClick(o)} } >
              <div className={styles.chatonlineimgcontainer} >
                 <img className={styles.chatonlineimg} src={ o.profilePicture ? o.profilePicture : "/images/nocover2.png" } alt="" />
                 <div className={styles.chatonlinebadge} >  </div> 
              </div>
              <span className={styles.chatonlinename}  > {o.username} </span>
          </div>
           ) ) }
      </div>
    </>
  )
}
