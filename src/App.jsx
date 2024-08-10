import { useState, useContext} from 'react'
import './App.css'
import {Navbar} from './Components/Navbar/Navbar'
import { Route, Routes} from 'react-router-dom'
import { Login } from './Pages/Login/Login'
import {Home} from './Pages/Home/Home';
import {Video} from './Pages/Video/Video';
import { SearchVideos } from './Pages/SearchVideos/SearchVideos';
import {Shorts} from './Pages/Shorts/Shorts'
import {Subscriptions} from './Pages/Subscriptions/Subscriptions' 
import {Account} from './Pages/Account/Account'
import { MyContext } from './Context/Context';
import { ProtectedRoute } from './Components/ProtectedRoute/ProtectedRoute'
import { NoPageFound } from './Components/NoPageFound/NoPageFound'

function App() {
  const {hideSidebar} = useContext(MyContext)

  return (
    <>
     <div className={`${hideSidebar ? '':'overlay'}`}></div> 
     <Routes>
      <Route path='/' element={<ProtectedRoute Component={Login} />} />
      <Route path='/home' element={<ProtectedRoute Component={Home} />} />
      <Route path='/home/video/:categoryId/:videoId' element={<ProtectedRoute Component={Video} />} />
      <Route path='/search-videos' element={<ProtectedRoute Component={SearchVideos} />} />
      <Route path='/shorts' element={<ProtectedRoute Component={Shorts} />} />
      <Route path='/subscription' element={<ProtectedRoute Component={Subscriptions} />} />
      <Route path='/account' element={<ProtectedRoute Component={Account } />} />
      <Route path='*' element={<NoPageFound />} />
     </Routes>
    </>
  )
}

export default App
