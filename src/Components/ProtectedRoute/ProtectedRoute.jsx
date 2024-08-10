import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'

export const ProtectedRoute = ({Component}) => {
    const navigate = useNavigate()
    const [isLogin, setLogin] = useState(localStorage.getItem('login') === 'true')

    useEffect(() => {
        if(!isLogin){
            navigate('/')
        }
    },[])

    return (
        <Component />
    )
}