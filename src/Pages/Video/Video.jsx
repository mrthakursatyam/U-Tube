import React, { useState, useEffect, useContext } from "react"
import './Video.css'
import {Sidebar} from '../../Components/Sidebar/Sidebar';
import {PlayVideo} from '../../Components/PlayVideo/PlayVideo'
import {Recommended} from "../../Components/Recommended/Recommended"
import {Feed} from "../../Components/Feed/Feed"
import { Navbar } from "../../Components/Navbar/Navbar";
import {useParams} from 'react-router-dom'
import { MyContext } from "../../Context/Context";


export const Video = () => {
    ///...useParams for getting videoId and CategoryId from chrome parameter
    const {categoryId} = useParams()
    const {
      tabletModeRecom, setTabletModeRecom,
    } = useContext(MyContext)

    useEffect(() => {
      const handleResize = () => {
        if (768 <= window.innerWidth && window.innerWidth <= 1000) {
            setTabletModeRecom(true)
        } else {
            setTabletModeRecom(false)
        }
      }
  
      window.addEventListener('resize', handleResize);
      handleResize();
  
      return () => {
        window.removeEventListener('resize', handleResize);
      }
    }, [])
  

    return (
        <>
        <Navbar />
        <div className="play-container">
        <Sidebar homeFun={false} />
          <PlayVideo  />
          {tabletModeRecom ? 
          <Feed />
          :
          <Recommended categoryId={categoryId} />
          }
        </div>
      </>
    )
}