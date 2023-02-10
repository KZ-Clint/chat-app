import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Messenger.module.css'
import AddHomeIcon from '@mui/icons-material/AddHome'
import axios from 'axios'
import { useState, useEffect, useContext, useRef } from 'react';
import baseUrl from '../components/base/baseUrl'
import Conversation from '../components/Conversation'
import Message from '../components/Message'
import Chatonline from '../components/subcomp/Chatonline'
import io from 'socket.io-client'

const socket = io.connect(baseUrl)

export default function Messenger ({token,userdata, CUP,CN,CA}) {
  
  const [ conversations, setConversations] = useState([])
  const [ currentChat, setCurrentChat ] = useState(null)
  const [ messages, setMessages] = useState([])
  const [ newMessage, setNewMessage] = useState("")
  const [ arrivalMessage, setArrivalMessage] = useState(null)
  const [ onlineUsers, setOnlineUsers] = useState([])
  const scrollRef = useRef(); 


  useEffect(() => {
     socket.emit( "addUser", userdata.other._id )
     socket.on("getUsers", (users) => {

        setOnlineUsers( userdata.other.followings.filter( (f) => users.some((u) => u.userId === f ) ) )
     } )
     socket.on("getMessage", (data) => {
         setArrivalMessage({
           sender: data.senderId,
           text: data.text,
           createdAt: Date.now()
         })
     } )
  }, [userdata]);


  useEffect(() => {
    if( arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) ) {
      setMessages( (prev) => [...prev, arrivalMessage] )
    }
 }, [arrivalMessage, currentChat]);


  useEffect(() => {
    const getConversations = async () => {
      try {
         const res = await axios.get( `${baseUrl}/api/conversation/${userdata.other._id}` )
       
         setConversations(res.data.convo)
      } 
      catch (error) {
        console.log(error)
      } }
   getConversations()
  }, []);

  useEffect(() => {
    if(currentChat) { 
    const getMessages = async () => {
      try {
         const res = await axios.get( `${baseUrl}/api/message/${currentChat._id}` )
         console.log(" all the messages", res.data.message)
         setMessages(res.data.message)
      } 
      catch (error) {
        console.log(error)
      } }
   getMessages()
    }
  }, [currentChat]);
 
  const handleSubmit = async (e) => {
     e.preventDefault();
     const message = {
      sender: userdata.other._id,
      text: newMessage,
      conversationId:currentChat._id,
     }

     const receiverId = currentChat.members.find( member => member !== userdata.other._id )

     socket.emit("sendMessage", {
        senderId: userdata.other._id,
        receiverId,
        text: newMessage
     })
     try{
      const res = await axios.post(`${baseUrl}/api/message`, message )
      setMessages([...messages, res.data.message])
      setNewMessage("")
     } catch(err) {
      console.log(err)
     }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages]);



  return (
    <>
      <Head>
        <title> Social Media App </title>
      </Head>
        <div className={styles.messenger} >
            <div className={styles.chatmenu} >
                <div className={styles.chatmenuwrapper} > 
                    <input placeholder="Search for friends" className={styles.chatmenuinput} />
                    {  conversations.map( (convo) => (
                      <div key={convo._id} onClick={ () => { setCurrentChat(convo) } } >
                          <Conversation key={convo._id} convo={convo} userdata={userdata} />  
                        </div>
                    ) ) }
                                 
                </div>
            </div>
            <div className={styles.chatbox} >
                <div className={styles.chatboxwrapper} > 
                    { currentChat ? 
                    <> 
                    <div className={styles.chatboxtop} >
                      { messages.map( (msg) => (
                           <div key={msg._id} ref={scrollRef} >
                             <Message key={msg._id} msg={msg} own={ msg.sender ===  userdata.other._id ? true : false } />
                           </div>
                      ) ) }
                      
                    </div>
                    <div className={styles.chatboxbottom} >
                       <textarea className={styles.chatmessageinput} placeholder="Write something....." onChange={ (e) => { setNewMessage(e.target.value) } } 
                       value={newMessage} />  
                       <button className={styles.chatsubmitbutton} onClick={handleSubmit} > Send </button>
                    </div> </> :  <span className={styles.nullconvo} > Open a conversation to start a chat </span>
                     }
                </div>
            </div>
            <div className={styles.chatonline} >
                <div className={styles.chatonlinewrapper} > 
                  <Chatonline onlineUsers={onlineUsers} currentId={userdata.other._id} setCurrentChat={setCurrentChat} />
               
                </div>
            </div>
        </div>
    </>
  )
}

export async function getServerSideProps ({req,res}) {
  let tokenReq= {}
  let userData = {}
  if(req.cookies.token){
      tokenReq=JSON.parse(req.cookies.token)     
  } else {
    return {
      redirect:{
        permanent:false,
        destination:"/login"
      }
    }
  }
  if (Object.keys(tokenReq).length > 0 ) {
    const response = await fetch( `${baseUrl}/api/users/logged`, {  headers: {
      'Authorization': `Bearer ${tokenReq} `
    }})
     userData = await response.json()
   }  
   let CLOUD_UPDATE_PRESET = process.env.CLOUD_UPDATE_PRESET
   let CLOUD_NAME  = process.env.CLOUD_NAME
   let CLOUD_API = process.env.CLOUD_API

  return {
      props: {
        token: tokenReq, 
        userdata: userData,
        CUP : CLOUD_UPDATE_PRESET,
        CN :  CLOUD_NAME,
        CA : CLOUD_API  
      }
  }
}
