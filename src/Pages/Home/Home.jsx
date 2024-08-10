import {useContext, useState, useEffect} from "react"
import './Home.css'
import {Sidebar} from '../../Components/Sidebar/Sidebar';
import {Feed} from '../../Components/Feed/Feed';
import { Navbar } from "../../Components/Navbar/Navbar";
import { BottomNav } from "../../Components/BottomNav/BottomNav";
import { useSearchParams, useLocation } from "react-router-dom";
import { MyContext } from "../../Context/Context";


export const Home = () => {
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const {
    userInfo, setUserInfo,
    removeSidebar, setRemoveSidebar,
    narrowSidebar,
  } = useContext(MyContext)
  
  useEffect(() => {
    if (location.state && location.state.userInfo) {
      setUserInfo(location.state.userInfo);
      console.log(location);
    }
  }, [location.state, setUserInfo]);

  useEffect(() => {
    const handleResize = () => {
      if (windowWidth < 500) {
        setRemoveSidebar(true)
      } else {
        setRemoveSidebar(false)
      }
    }
        
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  // console.log(searchResult);

  return (
        <>
        <Navbar />
        { !removeSidebar && <Sidebar homeFun={true} />}
        <div className={`feed-container ${narrowSidebar ? "large-container":""} `}>
          <Feed />
        </div>
        {removeSidebar && <BottomNav />}
        </>
    )
}