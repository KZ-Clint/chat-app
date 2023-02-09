import Image from 'next/image'
import styles from '../styles/Feed.module.css'
import Post from './subcomp/Post'
import { useState, useEffect, useContext } from 'react'
import Share from './subcomp/Share'
import baseUrl from './base/baseUrl'
import axios from 'axios'
import {useRouter} from 'next/router'
import { AuthContext } from './context/Authcontext'



export default function Feed ({username, CUP, CN, CA}) {

   const { user } = useContext(AuthContext)
   const [ posts, setPosts ] = useState([])
   const router = useRouter()


   useEffect( () => {
      const getPost = async () => {
         if(user) { 
         try {
            const res = router.pathname === "/" ? await axios.get( `${baseUrl}/api/posts/timeline/${user._id}` )
            :  await axios.get( `${baseUrl}/api/posts/profile/${username}` )
            console.log(" all the posts by spec user", res.data.userPosts)
            setPosts(res.data.userPosts.sort( (p1,p2) => {
               return new Date(p2.createdAt) - new Date(p1.createdAt)
            } ))  
         } 
         catch (error) {
           console.log(error)
         } }
      }
      getPost()
    },[user, username] )

  return (
    <> 
    { user &&  
       <div className={styles.feed} >
          <div className={styles.feedwrapper} >
           {  user.username === username &&  <Share CUP={CUP} CN={CN} CA={CA}  /> }
             { posts.map( (post) => (
                 <Post key={post._id} post={post} />
             ) ) }
             
           
          </div>
       </div> }
    </>
  )
}
