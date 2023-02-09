import Image from 'next/image'
import styles from '../styles/Topbar.module.css'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import ChatIcon from '@mui/icons-material/Chat'
import Link from 'next/link'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { AuthContext } from './context/Authcontext'
import { useContext } from 'react'


export default function Topbar () {

   const { user } = useContext(AuthContext) 

  return (
    <>
    { user && 
       <div className={styles.topbarcontainer} >
          <div className={styles.topbarleft} > 
              <Link href={"/"}>
                 <span className={styles.logo} > {user && user.username.charAt(0).toUpperCase()+user.username.slice(1) }social </span>
              </Link>
           </div>
          <div className={styles.topbarcenter} > 
              <div className={styles.searchbar} > 
                 <SearchIcon className={styles.searchicon} />
                 <input type="text" placeholder="search for friend, post or video" className={styles.searchinput}  />
              </div>
           </div>
          <div className={styles.topbarright} > 
              <div className={styles.topbarlinks} > 
                  <span className={styles.topbarlink} > HomePage </span>
                  <span className={styles.topbarlink} > Timeline </span>
              </div>
              <div className={styles.topbaricons} >
                 <div className={styles.topbariconitem} > 
                    <PersonIcon/>
                    <span className={styles.topbariconbadge} > 1 </span>
                 </div>
                 <Link href={`/messenger`} >
                     <div className={styles.topbariconitem} > 
                        <ChatIcon/>
                        <span className={styles.topbariconbadge} > 2 </span>
                     </div>
                 </Link>
                 <div className={styles.topbariconitem} > 
                    <NotificationsIcon/>
                    <span className={styles.topbariconbadge} > 1 </span>
                 </div>
              </div>
              <Link href={`/profile/${user.username}`} >
                <img src={ user && user.profilePicture ? user.profilePicture : "/images/nocover2.png" } alt="" className={styles.topbarimg} />
              </Link>
           </div>
       </div> }
    </>
  )
}
