import Home from '../Home/Home'
import { Routes ,Route } from 'react-router-dom'
import Search from '../Search/Search'
import Profile from '../Profile/Profile'
import './Content.css'

const Content = (props) => {
  
 
  


  return (
  
    <div className="ContentContainer" style={props.isPlaying? {height: "calc(100vh - 6.8rem)"}:{}}>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Profile' element={<Profile/>} />
        <Route path='/Search' element={<Search/>} />
        <Route path='/Featured-Playlist' element={<Home/>} />
      </Routes>
       
    </div>
  )
}

export default Content