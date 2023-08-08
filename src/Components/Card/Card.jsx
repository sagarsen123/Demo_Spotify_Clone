import { useDispatch ,useSelector } from "react-redux";
import "./Card.css";
import axios from "axios";
import { updatePlaySongs } from "../../actions";
import { currTrackIdx, playSong,playingSongs } from "../../actions";
const Card = (props) => {
  const myState = useSelector((state)=>state.loginAndLogout)
  const getSongsAfterCliick = async() =>{
    if(props.type==="playlist"){
      try {
        let songsOfPlaylist = await axios.get(
          `https://api.spotify.com/v1/playlists/${props.id}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}}`,
            },
          }
        )
        let currArray = myState.listingofweeksongs.Songs.slice(0,myState.currIdx+1);
        for( let songs of songsOfPlaylist.data.items){
          currArray.push(songs.track);
        }
        dispatch(updatePlaySongs(currArray))
        dispatch(currTrackIdx(myState.currIdx + 1));
        // console.log(songsOfPlaylist.data.items)
      }catch{
  
      }
    }else{
      console.log(props.type)
      try {
        let grabedSong = await axios.get(
          `https://api.spotify.com/v1/tracks/${props.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}}`,
            },
          }
        )
        let currArray = myState.listingofweeksongs.Songs.slice(0,myState.currIdx+1);
        currArray.push(grabedSong.data)
       
        dispatch(updatePlaySongs(currArray))
       
        dispatch(currTrackIdx(myState.currIdx + 1));

      }catch{
  
      }
    }
    
  }

  const handleClick = ()=>{
    getSongsAfterCliick()
    dispatch(playSong());
    dispatch(playingSongs())
  
  }
  const dispatch = useDispatch();
  
  return (
    <div className="card"   onClick={handleClick}>
      <img src={props.imgsrc} alt="" />
      <div className="CardDetails">
        <h3>{props.Title}</h3>
        <p>{props.desc.split(" ").length > 10 ? (props.desc.split(" ").slice(0,10).join(" ")): props.desc}</p>
      </div>
    </div>
  );
};

export default Card;
