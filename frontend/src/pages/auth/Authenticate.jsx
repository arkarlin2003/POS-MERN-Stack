import { useSelector } from "react-redux"
import { Navigate, Outlet } from 'react-router-dom'

const Authenticate = () => {
    const credential = useSelector(state=>state.credential)
    if(credential?._token){
        return (<Outlet/>)
    }else{
        return <Navigate to="/login"/>
    }
}

export default Authenticate