import Image from 'next/image'
import styles from '../../styles/Share.module.css'
import { useState, useEffect, useContext, useRef } from 'react';
import PermMediaIcon from '@mui/icons-material/PermMedia'
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CancelIcon from '@mui/icons-material/Cancel';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { AuthContext } from '../context/Authcontext';
import baseUrl from '../base/baseUrl';
import axios from 'axios'
import { ImageUpload } from '../imageUpload/imageUpload';


export default function Share ({CUP, CN, CA}) {
   
   const {user} = useContext(AuthContext);
   const description = useRef()

   const [ file, setFile ] = useState(null)

   const submitHandler = async (e) => {
      e.preventDefault()
      let media;
      if(file) {
         media = await ImageUpload([file], CUP, CN, CA)
       }
      console.log(media)
      const newPost = {
         userId : user._id,
         description: description.current.value,
         img: media || file ? media[0].url : ""
      }
      if(media) { 
      try{
         const res = await axios.post(`${baseUrl}/api/posts`, newPost )
         console.log(res.data.savedPost)
         window.location.reload()
      } catch (err){
          console.log(err.response.data.error)
      } }
      
   }

  return (
    <>
       <div className={styles.share} >
          <div className={styles.sharewrapper} >
              <div className={styles.sharetop} >
                 <img className={styles.shareprofileimg}  src={ user && user.profilePicture ? user.profilePicture : "/images/nocover2.png" } alt="" />
                 <input placeholder={`What is in your mind ${ user && user.username}?`} className={styles.shareinput} ref={description}
                  />
              </div> 
              <hr className={styles.sharehr} /> 
               { file && (  
                  <div className={styles.shareimgcontainer} >
                      <img className={styles.shareimg} src={URL.createObjectURL(file)} alt="" />  
                      <CancelIcon className={styles.sharecancelimg} onClick={ () => setFile(null) } />
                  </div>
               ) }
              <form className={styles.sharebottom} onSubmit={submitHandler} >
                  <div className={styles.shareoptions} >
                     <label className={styles.shareoption} htmlFor="file" >
                        <PermMediaIcon htmlColor="tomato" className={styles.shareicon} />
                        <span className={styles.shareoptiontext} > Photo or Video </span>
                        <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={ (e) => setFile(e.target.files[0]) }  />
                     </label>
                     <div className={styles.shareoption} >
                        <LabelIcon htmlColor="blue" className={styles.shareicon} />
                        <span className={styles.shareoptiontext} > Tag </span>
                     </div>
                     <div className={styles.shareoption} >
                        <LocationOnIcon htmlColor="green" className={styles.shareicon} />
                        <span className={styles.shareoptiontext} > Location </span>
                     </div>
                     <div className={styles.shareoption} >
                        <EmojiEmotionsIcon htmlColor="goldenrod" className={styles.shareicon} />
                        <span className={styles.shareoptiontext} > Feeling </span>
                     </div>
                  </div>
                  <button className={styles.sharebutton} type="submit" > Share </button>
              </form>  
          </div>
       </div>
    </>
  )
}