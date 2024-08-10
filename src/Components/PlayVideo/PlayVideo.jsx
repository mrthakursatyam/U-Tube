import { useState, useEffect, useCallback, useContext, useMemo } from "react";
import "./PlayVideo.css";
// import {Comments} from './Comments'
import { CustomSelect } from "./CustomSelect";
import video from "../../assets/video.mp4";
import jackImg from "../../assets/jack.png";
import share from "../../assets/share.png";
import download from "../../assets/download.png";
import threeDots from "../../assets/threedots.png";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import { API_KEY, Converter } from "../../data";
import { formatDistanceToNow, parseISO } from 'date-fns'
import {useParams, Link} from 'react-router-dom';
import { faL } from "@fortawesome/free-solid-svg-icons";
import YouTube from "react-youtube";
import { MyContext } from "../../Context/Context";


export const PlayVideo = () => {
  const {
    expandCommSec, setExpandCommSec
  } = useContext(MyContext)
  const {videoId} = useParams()

  //...fetching details of video
  const [videoDetail, setVideoDetail] = useState(null)
  const [channelDetail, setChannelDetail] = useState(null)
  const [comments, setComments] = useState(null);
  
  const fetchVideoDetail = async () => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch video details");
      }
      const data = await response.json();
      setVideoDetail(data.items[0]);
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  }

  const fetchChannelDetail = async () => {
    const channelId = videoDetail?.snippet?.channelId;
    const channelDetailUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API_KEY}`;
    const response = await fetch(channelDetailUrl);
    const data = await response.json(); 
    setChannelDetail(data.items[0]);
  }

  const fetchComments = async () => {
    const commentsUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&videoId=${videoId}&key=${API_KEY}`;
    const response = await fetch(commentsUrl);
    const data = await response.json(); 
    setComments(data.items);
  }

  useEffect(() => {
    fetchVideoDetail()
  },[videoId])

  useEffect(() => {
    fetchChannelDetail()
    fetchComments()
  },[videoDetail])


  //...Custom Select...///
  const [subscribedValue, setSubscribedValue] = useState(false);
  const [showSelect, setShowSelect] = useState(true);

  const handleSelect = (option) => {
    setShowSelect(false); // Hide the CustomSelect component
    setSubscribedValue(true)
  };

  const toggleSubBtnToCusSelect = () => {
    setShowSelect(true); // show the CustomSelect Componenet
  }

  ///...Video Description...///
  const [isExpand, setExpand] = useState(false)

  ///...adjust comment-section according to window size
  const [enableClickFn, setEnableClickFn] = useState(false)

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setEnableClickFn(true)
      } else {
        setEnableClickFn(false)
        setExpandCommSec(false)
      }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  const onPlayerStateChange = (event) => {
    console.log(event);
  };

  const handleFullScreenChange = (event) => {
    setIsFullscreen(event.data === 1); // Data value 1 indicates fullscreen
  };


  return (
    <div className="play-video">
       {/* <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} allowFullScreen  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
       <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onStateChange={onPlayerStateChange}
      />
       {!expandCommSec &&
       <>
       <h3>{videoDetail?.snippet?.title || "Loading..."}</h3>
      <div className="detail">
        <div className="channelAndSubsBox">
        <div className="channel">
          <img src={
            channelDetail?.snippet?.thumbnails && channelDetail.snippet.thumbnails.default.url? 
            channelDetail.snippet.thumbnails.default.url : jackImg
          } alt="" />
          <div className="channel-info">
          <h5>{videoDetail?.snippet?.channelTitle || "Loading..."}</h5>
          <p>{channelDetail?.statistics?.subscriberCount && channelDetail.statistics.subscriberCount ? Converter(channelDetail.statistics.subscriberCount):"0"} subscribers</p>
          </div>
        </div>


        {/* //////Custom select tag///////// */}
        <div className="subscribe-options">
          {!subscribedValue ? (
            <div className="subscribedBox" onClick={() => setSubscribedValue((prev) => !prev)}>
              Subscribe
            </div>
          ) : (
          <>
          {showSelect ? (<CustomSelect onSelect={handleSelect}  />) :
          (<div className="subscribedBox" 
            onClick={toggleSubBtnToCusSelect}>Subscribe</div>)
          }
          </>
          )
          }
        </div>
        </div>
        
        <div className="supporting-options">
            <span className="userInputs-options">
                <span><img src={like} alt="" />
                {videoDetail?.statistics && videoDetail?.statistics?.likeCount ? 
                Converter(videoDetail.statistics.likeCount):
                "Loading..."}
                </span>
                <span><img src={dislike} alt="" /></span>
            </span>
            <span><img src={share} alt="" /> Share</span>
            <span><img src={download} alt="" /> Download</span>
            <span><img src={threeDots} alt="" /></span>
        </div>
      </div>
      <div className="description">
        <div className="viewsAndTime">
          <span>
              {videoDetail?.statistics
                ? Converter(videoDetail.statistics.viewCount)
                : "Loading..."}{" "}
              views
            </span>
            <span>
              {videoDetail?.snippet?.publishedAt && videoDetail.snippet.publishedAt
                ? formatDistanceToNow(new Date(videoDetail.snippet.publishedAt))
                : "Loading..."}
            </span>
        </div>
        <p className={`videoDescription  ${isExpand ? "expandDesc" : "limitDesc"}`}>
          {videoDetail?.snippet?.description ? videoDetail.snippet.description:"Loading..."}
        </p>
        <button onClick={() => setExpand(!isExpand)}>{isExpand ? "Show less":"...more"}</button>
      </div>
      </>
      }
      <div className={`${expandCommSec ? "expand-comment-section":"comment-section"}`} onClick={enableClickFn ? ()=>setExpandCommSec(true):undefined}>
        <div className="comment-section-header">
          <h2>{videoDetail?.statistics?.commentCount ? Converter(videoDetail.statistics.commentCount):"Loading..."} Comments</h2>
          {expandCommSec && <button className="closeComm-list" onClick={(e)=>{ e.stopPropagation(); setExpandCommSec(false)}}>x</button>}
        </div>
        <div className="comments-list">
        {comments && comments.map((currComment, index) => (
          <div className="comment" key={index}>
            <img src={currComment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
            <div className="commenter-info">
            <div>
              <span className="name">{currComment.snippet.topLevelComment.snippet.authorDisplayName}</span>
              <span className="time">{formatDistanceToNow(new Date(currComment.snippet.topLevelComment.snippet.publishedAt))}</span>
            </div>
            <p>{currComment.snippet.topLevelComment.snippet.textOriginal}</p>
            <span className="likeAndDislike"><img src={like} alt="" />{currComment.snippet.topLevelComment.snippet.likeCount}</span>
            <span className="likeAndDislike"><img src={dislike} alt="" /></span>
            <span className="replyBtn">Reply</span>
          </div>
        </div>))}
      </div>
    </div>
  </div>
  );
};
