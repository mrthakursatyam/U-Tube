import {useContext, useState} from 'react'
import './BottomNav.css'
import { NavLink } from 'react-router-dom'
import homeImg from '../../assets/home.png'
import shortsImg from '../../assets/shorts.png'
import subscribeImg from '../../assets/subscribe.png'
import accountImg from '../../assets/user_profile.jpg'
import { MyContext } from '../../Context/Context'


export const BottomNav = () => {
    const { userInfo } = useContext(MyContext)

    return (
        <div className="bottom-nav">
            <NavLink to='/home' className={({ isActive }) => isActive ? 'active-link' : 'inactive-link'}>
                <img src={homeImg}/><h4>Home</h4> 
            </NavLink>
            <NavLink to='/Shorts' className={({ isActive }) => isActive ? 'active-link' : 'inactive-link'}>
                <img src={shortsImg}/><h4>Shorts</h4> 
            </NavLink>
            <NavLink to='/subscription' className={({ isActive }) => isActive ? 'active-link' : 'inactive-link'}>
                <img src={subscribeImg}/><h4>Subscriptions</h4> 
            </NavLink>
            <NavLink to='/account' className={({ isActive }) => isActive ? 'active-link' : 'inactive-link'}>
                <img src={userInfo!=null ? userInfo.picture:accountImg}/><h4>Account</h4>
            </NavLink>
        </div>
    )
}
