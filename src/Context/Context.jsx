import {createContext, useState} from 'react'

export const MyContext = createContext()

const MyContextProvider = (props) => {
  const [narrowSidebar, setNarrowSidebar] = useState(window.innerWidth > 1000 ? false : true)
  const [hideSidebar, setHideSidebar] = useState(true)
  const [expandCommSec, setExpandCommSec] = useState(false)
  const [category, setCategory] = useState(0)
  const [removeSidebar, setRemoveSidebar] = useState(false) 
  const [tabletModeRecom, setTabletModeRecom] = useState(false)
  const [searchResult, setSearchResult] = useState(null)
  const [videosCategoryId, setVideosCategoryId] = useState([])
  const [userInfo, setUserInfo] = useState(null)

  const contextValue = {
    videosCategoryId,
    narrowSidebar,
    hideSidebar,
    expandCommSec,
    removeSidebar,
    category,
    tabletModeRecom,
    searchResult,
    userInfo, 
    setUserInfo,
    setNarrowSidebar,
    setHideSidebar,
    setExpandCommSec,
    setRemoveSidebar,
    setCategory,
    setTabletModeRecom,
    setSearchResult,
    setVideosCategoryId,
  }

  return (
    <MyContext.Provider value={contextValue}>
    {props.children}
    </MyContext.Provider>
  )
}

export default MyContextProvider