import Content from '../Content/Content'
import SideBar from '../SideBar/SideBar'
import Player from '../Player/Player'
import './Main.css'
import { useSelector } from 'react-redux'
import MobileSideBar from '../MobileSideBar/MobileSideBar'
const Main = () => {

  const myState = useSelector(state => state.loginAndLogout)
  return ( 
    <div className="Main" >
        <SideBar isPlaying={myState.isPlaying}/>
        <Content isPlaying={myState.isPlaying}/>
       {myState.isPlaying && <Player/>}
       <MobileSideBar/>
    </div>
  )
}

export default Main