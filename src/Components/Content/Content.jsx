import Home from '../Home/Home'
import { Routes ,Route } from 'react-router-dom'
import Search from '../Search/Search'
import axios from 'axios'
import Profile from '../Profile/Profile'
import FeaturedPlaylist from '../FeaturedPlaylist/FeaturedPlaylist'
import './Content.css'
import { useEffect } from 'react'

const Content = (props) => {
  
 
  


  return (
  
    <div className="ContentContainer" style={props.isPlaying? {height: "calc(100vh - 6.8rem)"}:{}}>
      <Routes>
        {/* <Route path='/' element={<Home/>} /> */}
        <Route path='/' element={<Home/>} />
        <Route path='/Profile' element={<Profile/>} />
        <Route path='/Search' element={<Search/>} />
        {/* <Route path='/Featured-Playlist' element={<FeaturedPlaylist/>} /> */}
        <Route path='/Featured-Playlist' element={<Home/>} />
      </Routes>
       
    </div>
  )
}

export default Content