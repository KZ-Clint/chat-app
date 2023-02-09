import Image from 'next/image'
import styles from '../../styles/Online.module.css'


export default function Online ({user}) {
  return (
            <> 
                   <li className={styles.rightbarfriend} >
                       <div className={styles.rightbarprofileimgcontainer} >
                          <img className={styles.rightbarprofileimg} src={user.profilePicture} alt="" />
                          <span className={styles.rightbaronline} >  </span>
                       </div>
                       <span className={styles.rightbarusername}> {user.username} </span>
                   </li>
            </>
  )
}
