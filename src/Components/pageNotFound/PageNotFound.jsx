import React, { useEffect } from 'react'
import './PageNotFound'
import notFound from './Daco_5259774.png'
import { useNavigate } from 'react-router-dom'
const PageNotFound = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    setTimeout(()=>{
      navigate('/');
    },2000)
  },[])
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"centerS",width:"100vw",padding:"10% 2%",height:"100vh"

    }}>
      <img src={notFound} alt="Page Not Found ..."  style={{width:"100%"}}/>
      <h1>Wait ReDirecting to main Site</h1>
    </div>
  )
}

export default PageNotFound