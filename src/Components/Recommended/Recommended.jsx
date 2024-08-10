import React, { useContext, useEffect, useState } from "react"
import {Link} from 'react-router-dom'
import './Recommended.css'
// import {RecommendedData} from './RecommendedData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import {API_KEY, Converter} from '../../data';
import { formatDistanceToNow} from "date-fns";
import { MyContext } from "../../Context/Context";

export const Recommended = ({categoryId}) => {
    const {
        expandCommSec
    } = useContext(MyContext)
    const [recommendedVideos, setRecommendedVideos] = useState([])

    const fetchRecommendedVideos = async() => {
        const videos_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=100&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`
        await fetch(videos_url)
        .then(response => response.json())
        .then(data => setRecommendedVideos(data.items))
    }

    useEffect(() => {
        fetchRecommendedVideos()
        console.log(recommendedVideos); 
    },[])


    return (
        <>
        {!expandCommSec && <div className="recommended-videos-list">
            {recommendedVideos.map((currVideo, index) => (
                <Link to={`/home/video/${currVideo.snippet.categoryId}/${currVideo.id}`} key={index} className="card">
                    <img src={currVideo.snippet.thumbnails.high.url} alt="" />
                    <div className="lower-card">
                        <h2>{(currVideo.snippet.title).substring(0,90)}...</h2>
                        <h3>{currVideo.snippet.channelTitle}</h3>
                        <p>{Converter(currVideo.statistics.viewCount)}  <FontAwesomeIcon icon={faCircle}  className="dot"/>{formatDistanceToNow(new Date(currVideo.snippet.publishedAt))}</p>
                    </div>
              </Link>
            ))}
        </div>}
        </>
    )
}