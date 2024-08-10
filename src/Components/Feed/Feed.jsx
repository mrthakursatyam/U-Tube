import {useState, useEffect, useContext} from "react"
import './Feed.css'
import {Link, json} from 'react-router-dom'
// import { FeedData } from "./FeedData"
import { MyContext } from "../../Context/Context"
import thumbnail8 from '../../assets/thumbnail8.png'
import {API_KEY, Converter} from '../../data'
import {formatDistanceToNow} from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

export const Feed = () => {

  const {
    narrowSidebar,
    category,
    expandCommSec,
    tabletModeRecom
  } = useContext(MyContext)

  const [data, setData] = useState([])
  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`
    const response = await fetch(videoList_url)
    const data = await response.json()
    setData(data.items)
    }

  useEffect(() => {
    fetchData()
  },[category])
    

  return (
    <>
    {!expandCommSec && <div className={`feed ${narrowSidebar ? "wideFeed":""}`}>
    {data.map((currVideo, index) => (
      <Link to={tabletModeRecom ?`/video/${currVideo.snippet.categoryId}/${currVideo.id}` :`video/${currVideo.snippet.categoryId}/${currVideo.id}`} className="card" key={index}>
        <div className="upper-card">
            <img src={currVideo.snippet.thumbnails.medium.url} alt="" />
        </div>
        <div className="lower-card">
            <div className="left-card">
                <img src={thumbnail8} alt="" />
            </div>
            <div className="right-card">
                <h2>{(currVideo.snippet.title).length > 60 ? (currVideo.snippet.title.substring(0,80))+"..." : currVideo.snippet.title}</h2>
                <h3>{currVideo.snippet.channelTitle}</h3>
                <p>{Converter(currVideo.statistics.viewCount)} views  <FontAwesomeIcon icon={faCircle}  className="dot"/>{formatDistanceToNow(new Date(currVideo.snippet.publishedAt), { addSuffix: true })}</p>
            </div>
        </div>
      </Link>
    )
  )}
  </div>}
  </>
  )
}

