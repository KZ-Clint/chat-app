import { AuthContextProvider } from '../components/context/Authcontext'
import Rightbar from '../components/Rightbar'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

    if(Component.getLayout) {
     return Component.getLayout(
          <>
          <AuthContextProvider>
             <Component {...pageProps} />
          </AuthContextProvider>
          </>
       )
  }

  return ( 
    <>
    <AuthContextProvider>
      <Topbar/>
      {/* <div className="homecontainer" >
            <Sidebar/>
            <Component {...pageProps} />
            <Rightbar/>
          </div>     */}
          <Component {...pageProps} />
        </AuthContextProvider>
   </>
  )
}

export default MyApp
