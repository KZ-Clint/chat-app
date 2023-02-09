import Image from 'next/image'
import styles from '../styles/Conversation.module.css'
import { useState, useEffect, useContext } from 'react'
import baseUrl from './base/baseUrl'
import axios from 'axios'



export default function Conversation ({convo, userdata}) {

  const [ user, setUser ] = useState(null)

  useEffect(() => {
      const friendId = convo.members.find( m => m !== userdata.other._id )  
      const getUser = async () => {
        try { 
          const res = await axios.get(`${baseUrl}/api/users?userId=${friendId}`)
          setUser(res.data.other)
        } catch (err) {
          console.log(err)
        }
      }
      getUser()
  }, [userdata, convo]);
 
  return (
    <> {  user &&
      <div className={styles.conversation} >
          <img className={styles.conversationimg} src={ user.profilePicture ? user.profilePicture : "/images/nocover2.png" } alt="" />
          <span className={styles.conversationname} > { user && user.username} </span>
      </div>
       }
    </>
  )
}
