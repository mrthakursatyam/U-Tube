import React, { useState, useEffect, useContext } from "react"
import './Navbar.css'
import { API_KEY } from "../../data"
import menuIcon from '../../assets/menu2.png'
import logo from '../../assets/logo.png'
import searchIcon from '../../assets/search.png'
import uploadIcon from '../../assets/upload.png'
import moreIcon from '../../assets/more.png'
import notificationIcon from '../../assets/notification.png'
import userIcon from '../../assets/user_profile.jpg'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { MyContext } from "../../Context/Context";


export const Navbar = () => {

    //find current path or current url
    const {pathname} = useLocation()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const {
        userInfo,
        searchResult, setSearchResult,
        videosCategoryId, setVideosCategoryId,
        removeSidebar, setRemoveSidebar,
        setNarrowSidebar,
        setHideSidebar,
    } = useContext(MyContext)

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

    const [query, setQuery] = useState('');
    const navigateToSearchVideoPage = useNavigate() 

    const fetchVideoDetails = async (videoId) => {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`)
            if (!response.ok) {
                throw new Error('Failed to fetch video details');
            }
            const data = await response.json();
            return data.items[0].snippet.categoryId;
        } catch (error) {
            console.error('Error fetching video details:', error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=${API_KEY}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSearchResult(data.items)
            await Promise.all(
                data.items.map(async (video) => {
                    setVideosCategoryId([...videosCategoryId, await fetchVideoDetails(video.id.videoId)])
                })
            );
        } catch (error) {
        console.error('Error fetching data from YouTube API', error)
        }
    }

    const handleInputChange = (e) =>{
        setQuery(e.target.value)
        console.log(e.target.value);
    }

    const handleKeyPress = (e) =>{
        if(e.key === 'Enter'){
            handleSearch()
            navigateToSearchVideoPage('/search-videos')
        }
    }

    return (
        <nav className="flex-div">
            <div className="nav-left flex-div">
                { !removeSidebar && <img className="menu-icon" src={menuIcon} alt="" onClick={pathname == '/' ?  ()=>setNarrowSidebar(prev=>!prev) : ()=>setHideSidebar(prev=>!prev)}/>}
                <Link to={'/home'}><img className="logo" src={logo} alt="" /></Link>
            </div>

            <div className="nav-middle flex-div">
                <div className="search-box flex-div">
                    <input type="text" placeholder="Search" onKeyDown={handleKeyPress} onChange={(e)=> handleInputChange(e)}/>
                    <Link to={'/search-videos'}><img src={searchIcon} alt="" onClick={(e)=> handleSearch(e)} /></Link>
                </div>
            </div>

            <div className="nav-right flex-div">
                <img src={uploadIcon} alt=""/>
                {/* <img src={moreIcon} alt=""/> */}
                <img src={notificationIcon} alt=""/>
                <img className="user-icon" src={userInfo ? userInfo.picture:userIcon} alt=""/>
            </div>
        </nav>
    )
}