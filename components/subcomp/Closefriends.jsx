import Image from 'next/image'
import styles from '../../styles/Closefriends.module.css'


export default function Closefriends ({user}) {
  return (
            <> 
                <li className={styles.sidebarfriend} >
                    <img className={styles.sidebarfriendimg} src={user.profilePicture} alt="" />
                    <span className={styles.sidebarfriendname} > {user.username} </span>
                </li>
            </>
  )
}
