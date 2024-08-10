import { useContext, useEffect, useState, useRef } from 'react'
import './Shorts.css'
import { BottomNav } from '../../Components/BottomNav/BottomNav'
import { MyContext } from '../../Context/Context'
import { API_KEY } from '../../data'

export const Shorts = () => {
    const {removeSidebar} = useContext(MyContext)
    const [shortVideos, setShortVideos] = useState([])
    const [nextPageToken, setNextPageToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentVideoId, setCurrentVideoId] = useState(null); // Track currently playing video
    const playerRef = useRef(null); // Reference to YouTube player iframe

    const fetchShorts = async(pageToken='') => {
        try{
            setLoading(true);
            const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=100&regionCode=IN&key=${API_KEY}&pageToken=${pageToken}`)
            
            if (!response.ok) {
                throw new Error("Failed to fetch video details");
            }
            const data = await response.json()
            console.log(data.items);
            const svideos = data.items.filter((video) => {
                const duration = video.contentDetails.duration;
                const match = duration.match(/PT(\d+M)?(\d+S)?/);
                if (match) {
                  const minutes = match[1] ? parseInt(match[1].replace('M', ''), 10) : 0;
                  const seconds = match[2] ? parseInt(match[2].replace('S', ''), 10) : 0;
                  return (minutes * 60 + seconds) <= 60;
                }
                return false;
            });
        
            setShortVideos((prevVideos) => [...prevVideos, ...svideos]);
            setNextPageToken(data.nextPageToken || '');
            setLoading(false);
            // setShortVideos(data.items);
        }
        catch(error)
        {
            console.log("Failed to fetch video details",error);
            setLoading(false);
        }  
    }

    useEffect(() => {
        fetchShorts()
    },[])

    useEffect(() => {
        // const handleScroll = () => {
        //   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 && !loading) {
        //     fetchShorts(nextPageToken);
        //   }
        // };
        const handleScroll = () => {
            if (!loading) {
                const shortsContainer = document.querySelector('.shorts-container');
                if (!shortsContainer) return;
                
                // Get all short-video elements in the viewport
                const shortVideos = Array.from(shortsContainer.querySelectorAll('.short-video'));
                
                // Find the first short-video that is visible and near the top of the viewport
                const visibleVideo = shortVideos.find((videoElement) => {
                    const rect = videoElement.getBoundingClientRect();
                    return rect.top >= 0 && rect.top <= window.innerHeight * 0.5; // Adjust this threshold as needed
                });
    
                if (visibleVideo) {
                    const videoId = visibleVideo.dataset.videoId; // Assuming you have stored videoId in a data attribute
                    if (videoId && videoId !== currentVideoId) {
                        playVideo(videoId);
                    }
                }
            }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => window.removeEventListener('scroll', handleScroll);
    }, [nextPageToken, loading, currentVideoId]);
    

    useEffect(() => {
        if (currentVideoId && playerRef.current) {
            // Pause the currently playing video
            playerRef.current.pauseVideo();
        }
    }, [currentVideoId]);

    function playVideo(videoId) {
        setCurrentVideoId(videoId);
        if (playerRef.current) {
            // Load and play the new video
            playerRef.current.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
            playerRef.current.load();
        }
    }


    return (
        <>
          <div className="shorts-container">
            {shortVideos && shortVideos.length > 0 && shortVideos.map((video, index) => (
              <div key={index} className="short-video">
                <iframe 
                  ref={playerRef}
                  className="short-iframe"
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=0&control=0&loop=1&playlist=${video.id}`} 
                  title={video.snippet.title} 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
                <div className="video-info">
                  <h3>{video.snippet.title}</h3>
                  <p>{video.snippet.description}</p>
                </div>
              </div>
            ))}
            {loading && <div className="loading">Loading...</div>}
          </div>
          {removeSidebar && <BottomNav />}
        </>
      )
}