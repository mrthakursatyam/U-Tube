import {useContext, useState} from "react"
import './SearchVideos.css'
import { Navbar } from "../../Components/Navbar/Navbar"
import { Link } from "react-router-dom"
import { Converter } from "../../data"
import { MyContext } from "../../Context/Context"


export const SearchVideos = () => {
    const {setSearchResult, videosCategoryId, searchResult} = useContext(MyContext)

    return (
        <>
        <Navbar searchResult={searchResult}  setSearchResult={setSearchResult} />
       {videosCategoryId.length !==0 &&  searchResult !==null && <div className="search-videos-list">
            {searchResult.map((currVideo, index) => (
                <Link to={`/home/video/${videosCategoryId[index]}/${currVideo.id.videoId}`} key={index} className="card">
                    <img src={currVideo.snippet.thumbnails.high.url} alt="" />
                    <div className="lower-card">
                        <h2>{(currVideo.snippet.title).substring(0,90)}...</h2>
                        <h3>{currVideo.snippet.channelTitle}</h3>
                        {/* <p>{Converter(currVideo.statistics.viewCount)}  <FontAwesomeIcon icon={faCircle}  className="dot"/>{formatDistanceToNow(new Date(currVideo.snippet.publishedAt))}</p> */}
                    </div>
              </Link>
            ))}
        </div>
       }
       </>
    )
}

