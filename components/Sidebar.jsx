import Image from 'next/image'
import styles from '../styles/Sidebar.module.css'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import ChatIcon from '@mui/icons-material/Chat'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import GroupIcon from '@mui/icons-material/Group'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import EventIcon from '@mui/icons-material/Event'
import SchoolIcon from '@mui/icons-material/School'
import { Users } from './Dummydata'
import Closefriends from './subcomp/Closefriends'

export default function Sidebar () {
  return (
    <>
       <div className={styles.sidebar} >
          <div className={styles.sidebarwrapper} >
             <ul className={styles.sidebarlist} >
                <li className={styles.sidebarlistitem} >
                    <RssFeedIcon className={styles.sidebaricon} />
                    <span className={styles.sidebarlistitemtext} > Feed </span>
                </li>
                <li className={styles.sidebarlistitem} >
                    <ChatIcon className={styles.sidebaricon} />
                    <span className={styles.sidebarlistitemtext} > Chats </span>
                </li>
                <li className={styles.sidebarlistitem} >
                    <PlayCircleIcon className={styles.sidebaricon} />
                    <span className={styles.sidebarlistitemtext} > Videos </span>
                </li>
                <li className={styles.sidebarlistitem} >
                    <GroupIcon className={styles.sidebaricon} />
                    <span className={styles.sidebarlistitemtext} > Groups </span>
                </li>
                <li className={styles.sidebarlistitem} >
                    <BookmarkIcon className={styles.sidebaricon} />
                    <span className={styles.sidebarlistitemtext} > Bookmarks </span>
                </li>
                <li className={styles.sidebarlistitem} >
                    <HelpOutlineIcon className={styles.sidebaricon} />
                    <span className={styles.sidebarlistitemtext} > Questions </span>
                </li>
                <li className={styles.sidebarlistitem} >
                    <WorkOutlineIcon className={styles.sidebaricon} />
                    <span className={styles.sidebarlistitemtext} > Jobs </span>
                </li>
                <li className={styles.sidebarlistitem} >
                    <EventIcon className={styles.sidebaricon} />
                    <span className={styles.sidebarlistitemtext} > Events </span>
                </li>
                <li className={styles.sidebarlistitem} >
                    <SchoolIcon className={styles.sidebaricon} />
                    <span className={styles.sidebarlistitemtext} > Courses </span>
                </li>
             </ul>
             <button className={styles.sidebarbutton} > Show More </button>
             <hr className={styles.sidebarhr} />
             <ul className={styles.sidebarfriendlist} >
                 {Users.map( (user) => (
                    <Closefriends key={user.id}  user={user} />
                 ) ) }
             </ul>
          </div>
       </div>
    </>
  )
}
