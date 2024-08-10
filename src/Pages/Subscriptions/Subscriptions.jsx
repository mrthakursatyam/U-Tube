import { useContext } from 'react'
import './Subscriptions.css'
import { BottomNav } from '../../Components/BottomNav/BottomNav'
import { Navbar } from '../../Components/Navbar/Navbar'
import { MyContext } from '../../Context/Context'
import {SidebarData} from '../../Components/Sidebar/SidebarData'

export const Subscriptions = () => {
    const {removeSidebar} = useContext(MyContext)

    return (
        <>
        <Navbar />
        <div className="subscriptions-class">
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
        {removeSidebar && <BottomNav />}
        </>
    )
}