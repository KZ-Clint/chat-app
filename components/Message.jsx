import Image from 'next/image'
import styles from '../styles/Message.module.css'
import { useState, useEffect, useContext } from 'react'
import {format} from "timeago.js"


export default function Message ({msg, own}) {


 
  return (
    <> 
      <div className={ own ? styles.messageown : styles.message} >
          <div className={styles.messagetop} > 
             <img className={styles.messageimg} src="/images/exoduswallet.png" alt="" />
             <p className={styles.messagetext} > {msg.text} </p>
          </div>
          <div className={styles.messagebottom} > {format(msg.createdAt)} </div>
      </div>
    </>
  )
}
