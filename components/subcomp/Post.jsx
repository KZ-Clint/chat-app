import Image from 'next/image'
import { useState, useEffect, useContext } from 'react';
import styles from '../../styles/Post.module.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios'
import baseUrl from '../base/baseUrl';
import Link from 'next/link'
import { AuthContext } from '../context/Authcontext';

export default function Post ({post}) {
   
    const { user } = useContext(AuthContext)
    const [ like, setLike ] = useState(post.likes.length)
    const [ isLiked, setIsLiked ] = useState(false)
    const [ uuser, setUser ] = useState({})

    const likeHandler = async() => {
        // setLike(isLiked ? like - 1: like+1)
        // setIsLiked(!isLiked)
        try{
            const res = await axios.put(`${baseUrl}/api/posts/${post._id}/like `, { userId:user._id } )
            console.log(res)
             setLike(isLiked ? like - 1: like+1)
             setIsLiked(!isLiked)
        } catch(err){
            console.log(err)
        }
       
    }

    useEffect( () => {
        const getUsers = async () => {
           try {
              const res = await axios.get( `${baseUrl}/api/users?userId=${post.userId}` )
              console.log(" all the user", res.data.other)
              setUser(res.data.other)  
           } 
           catch (error) {
             console.log(error)
           } 
        }
        getUsers()
      },[] )

    const getDate = (createdAt) => {
        var created = createdAt
        var date = new Date(created)
       return (date.getDate() +  " " + date.toLocaleString('default', { month: 'long' }) + " " + date.getFullYear())
    }
    const getHour = (createdAt) => {
        var created = createdAt
        var date = new Date(created)
       return (date.getHours() +  ":" + date.getMinutes() + ":" + date.getSeconds())
    }

  

  return (
    <>
       <div className={styles.post} >
           <div className={styles.postwrapper} >
               <div className={styles.posttop} > 
                  <div className={styles.posttopleft} > 
                       <Link href={`/profile/${uuser.username}`} >
                          <img className={styles.postprofileimg} src={ uuser.profilePicture ? uuser.profilePicture : "/images/nocover2.png" } alt="" />
                       </Link>  
                       <span className={styles.postusername} > { uuser.username } </span>
                       <span className={styles.postdate} > {getDate(post.createdAt)} </span>
                   </div>
                   <div className={styles.posttopright} > 
                      <MoreVertIcon/>
                   </div>
               </div>
               <div className={styles.postcenter} >
                   <span className={styles.posttext} > {post?.description }  </span>
                   <img className={styles.postimg} src={post.img} alt='' />
               </div>
               <div className={styles.postbottom} >
                   <div className={styles.postbottomleft} > 
                      <img className={styles.likeicon} src="/images/like.svg" alt="" onClick={likeHandler} />
                      <img className={styles.likeicon}  src="/images/unlove.svg" alt="" onClick={likeHandler} />
                      <span className={styles.postlikecounter} > {like} people like it </span>
                   </div>
                   <div className={styles.postbottomright} > 
                       <span className={styles.postcommenttext} > {post.comment} comments </span>
                   </div>
               </div>
           </div>
       </div>
    </>
  )
}
