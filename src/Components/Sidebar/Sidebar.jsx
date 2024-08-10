import {useContext, useEffect, useState} from 'react'
import './Sidebar.css'
import {SidebarData} from './SidebarData.js'
import { MyContext } from '../../Context/Context.jsx'


export const Sidebar = ({homeFun}) => {
    const {
        hideSidebar,
        narrowSidebar,
        category, setCategory
    } = useContext(MyContext)
    
    return (
        <div className={`${homeFun ? (narrowSidebar?"small-sidebar":"sidebar") : (hideSidebar?"hideSidebar":"showSidebar") }`}>
            <div className="shortcut-links">
                <div className={`side-link  ${category===0 ? 'active':''}`} onClick={()=>setCategory(0)}>
                    <img src={SidebarData.homeIcon} alt="" /><p>Home</p>
                </div>
                 <div className={`side-link  ${category===20 ? 'active':''}`} onClick={()=>setCategory(20)}>
                    <img src={SidebarData.gamingIcon} alt="" /><p>Gaming</p>
                </div>
                <div className={`side-link  ${category===2 ? 'active':''}`} onClick={()=>setCategory(2)}>
                    <img src={SidebarData.automobilesIcon} alt="" /><p>Automobiles</p>
                </div>
                <div className={`side-link  ${category===42 ? 'active':''}`} onClick={()=>setCategory(20)}>
                    <img src={SidebarData.sportsIcon} alt="" /><p>sports</p>
                </div>
                <div className={`side-link  ${category===24 ? 'active':''}`} onClick={()=>setCategory(24)}>
                    <img src={SidebarData.entertainmentIcon} alt="" /><p>Entertainment</p>
                </div>
                <div className={`side-link  ${category===28 ? 'active':''}`} onClick={()=>setCategory(28)}>
                    <img src={SidebarData.technologyIcon} alt="" /><p>Technology</p>
                </div>
                <div className={`side-link  ${category===10 ? 'active':''}`} onClick={()=>setCategory(10)}>
                    <img src={SidebarData.musicIcon} alt="" /><p>Music</p>
                </div>
                <div className={`side-link  ${category===22 ? 'active':''}`} onClick={()=>setCategory(22)}>
                    <img src={SidebarData.blogsIcon} alt="" /><p>Blogs</p>
                </div>
                <div className={`side-link  ${category===25 ? 'active':''}`} onClick={()=>setCategory(25)}>
                    <img src={SidebarData.newsIcon} alt="" /><p>News</p>
                </div>
                <hr />
            </div> 
            <div className="subscribed-list">
                <p className='subscription-heading'>Subscriptions</p>
                <div className="side-link">
                    <img src={SidebarData.jackImg} alt="" /><p>PewDiePie</p>
                </div>
                 <div className="side-link">
                    <img src={SidebarData.simonImg} alt="" /><p>MrBeast</p>
                </div>
                <div className="side-link">
                    <img src={SidebarData.tomImg} alt="" /><p>Justin bieber</p>
                </div>
                <div className="side-link">
                    <img src={SidebarData.meganImg} alt="" /><p>5-minute craft</p>
                </div>
                <div className="side-link">
                    <img src={SidebarData.cameronImg} alt="" /><p>nas daily</p>
                </div>
            </div>
        </div>
    )
}