import "./Home.css";
import HomeNoification from "../../images/HomeNotification.png";
import HomeDp from "../../images/HomeDp.png";
import Card from "../Card/Card";
import PlaylistThumbnail from "../../images/PlaylistThumbnail.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import axios from "axios";
import { updatePlaySongs } from "../../actions";
import { useParams } from "react-router-dom";

const Home = () => {
  
  const [HomeLoading,setHomeLoading] = useState(false);
  const [fPlaylist, setFPlaylist] = useState();
  const [fSongs, setfSongs] = useState();
  const dispatch = useDispatch();
  const [fullPlaylist,setFullPlaylist] = useState(false);
  const [fullSongs,setFullSongs] = useState(false);
  const params = useParams();
  const myState = useSelector((state) => {
    return state.loginAndLogout;
  });

  const getFeaturePlaylist = async () => {
    // if(myState.listingofweeksongs?.Songs?.length !== 0) return;
    try {
      let fPlayListReceived = await axios.get(
        "https://api.spotify.com/v1/browse/featured-playlists",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if(myState.isPlaying === false)    dispatch(updatePlaySongs([]))

      setFPlaylist(fPlayListReceived.data.playlists.items);
    } catch (err) {
      // console.log(err);
    }
  };
  const getFeatureSongs = async (num) => {
    if(myState.listingofweeksongs?.Songs?.length !== 0) {setfSongs(myState.listingofweeksongs.Songs)}
    try {
      let fSongsReceived = await axios.get(
        `https://api.spotify.com/v1/me/top/tracks?limit=${num}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}}`,
          },
        }
      );
      const listingofweeksongs=fSongsReceived.data.items


      setfSongs(fSongsReceived.data.items);
    
     } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {

      getFeaturePlaylist();
      getFeatureSongs(20);
   
      
  }, []);



  return HomeLoading ? (
    <p>Loading</p>
  ) : (
    <div className="Home">
      <div className="head">
        <div className="homeFunctions">
          <div className="notification">
            <img src={HomeNoification} alt="Notifications" />
          </div>
          <Link className="profile" to="/main/Profile">
            <img src={HomeDp} alt="" />
          </Link>
        </div>
        <div className="headText">
          <h1>Good Evening!</h1>
        </div>
      </div>
      <div className="PlaylistContainer">
        <div className="playGroupHead">
          <h3>Featured Playlist</h3>
          <p onClick={()=>setFullPlaylist(!fullPlaylist)}>{fullPlaylist ? "Show Less" : "See All"}</p>
        </div>
        <div className="playCardsGroup">
          {fPlaylist ? (

            <div className="row">
              {(fullPlaylist? fPlaylist: fPlaylist.slice(0,6)).map((item) => {
              
                return (
                  <Card
                  type="playlist"
                  setfuntion={setFullPlaylist}
                    id = {item.id}
                    Title={item.name}
                    key={item.id}
                    imgsrc={item.images[0].url}
                    desc={item.description}
                  />
                );
              })}
            </div>
          ) : (
            <p>Loading....</p>
          )}
        </div>
      </div>
      <div className="PlaylistContainer">
        <div className="playGroupHead">
          <h3>This Week Songs</h3>
          <p onClick={()=>setFullSongs(!fullSongs)}>{fullSongs ? "Show Less" : "See All"}</p>
        </div>
        <div className="playCardsGroup">
          {fSongs ? (
            
            <div className="row">
              {(fullSongs?fSongs : fSongs.slice(0,6)).map((song) => {
              
                return (
                  <Card
                  type = "Songs"
                  setfuntion={setFullSongs}
                    id={song.id}
                    key={song.id}
                    className="col"
                    Title={song.name}
                    imgsrc={song.album.images[0].url}
                    desc={song.artists[0].name}
                  />
                );
              })}
            </div>
          ) : (
            <p>Loading...!</p>
          )} 
        </div>
      </div>
    </div>
  );
};

export default Home;
