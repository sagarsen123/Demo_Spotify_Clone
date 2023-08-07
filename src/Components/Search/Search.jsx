import "./Search.css";
import { FiSearch } from "react-icons/fi";
import { AiFillCaretRight } from "react-icons/ai";
import albumImage from "../../images/Spotify-Albums.jpg";
import SearchSongImage from "../../images/SearchSongImage.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import searchHome from "../../images/SearchHome.png";
import { playSong,playingSongs,currTrackIdx, updatePlaySongs } from "../../actions";

const Search = () => {
  const [searched, setSearched] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchResponse, setSearchResponse] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [searchedArtists, setSearchedArtists] = useState([]);
  const [searchedSongs, setSearchedSongs] = useState([]);
  const myState = useSelector((state) => state.loginAndLogout);
  const dispatch = useDispatch();

  const getSearch = async () => {
    try {
      let fetchedResult = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=artist%2Ctrack&limit=12`,

        {
          headers: {
            Authorization: `Bearer ${myState.userToken}`,
          },
        }
      );

      setSearchResponse(fetchedResult);
      setSearchedArtists(fetchedResult.data.artists.items);
      setSearchedSongs(fetchedResult.data.tracks.items);
      // console.log(searchedSongs);
    } catch (err) {
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearched(false);
    getSearch();
    setSearched(true);
  };


  const handleArtistClick = async(artistid) =>{
    if(artistid==="") return console.log('no artist id found');
    else {
      try {
        let grabedArtistSongs = await axios.get(
          `https://api.spotify.com/v1/artists/${artistid}/top-tracks?market=ES`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}}`,
            },
          }
        )
       
      
        let currArray = myState.listingofweeksongs.Songs.slice(0,myState.currIdx+1);
       let grabedArtistSongsArray = grabedArtistSongs.data.tracks
       for(let song of grabedArtistSongsArray){
        currArray.push(song);
       }
        dispatch(updatePlaySongs(currArray))
        dispatch(currTrackIdx(myState.currIdx + 1));

        dispatch(playSong());
        dispatch(playingSongs())
       
      }catch{
  
      }
    }
  }

  const handleSongClick = async (Songid) =>{
    try {
      let grabedSong = await axios.get(
        `https://api.spotify.com/v1/tracks/${Songid}`,
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

      dispatch(playSong());
      dispatch(playingSongs())
     
    }catch{

    }
  }

  return (
    <div className="searchBarContainer">
      <div className="SearchBox">
        <form className="searchBar" onSubmit={handleSubmit}>
          <FiSearch className="searchIcon" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for artists, music and genres..."
          />
          <select
            value={filter}
            className="filter"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="artist">Artists</option>
            <option value="songs">Songs</option>
          </select>
        </form>
      </div>

      {searched ? (
        searchResponse ? (
          <>
            {filter === "all" || filter === "artist" ? (
              <div className="topResultsBox">
                {searchedArtists && (
                  <>
                    <h2>Top Artists</h2>
                    <div className="row">
                      {searchedArtists.slice(0,6).map((artist) => {
                        return (
                          <div
                            key={artist ? artist.id : ""}
                            className="searchedResultImg"
                            onClick={()=>handleArtistClick(artist? artist.id : "")}
                          >
                            <img
                              src={
                                artist.images.length > 0
                                  ? artist.images[0].url
                                  : albumImage
                              }
                              alt=""
                            />
                            <p>{artist.name}</p>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            ) : (
              ""
            )}

            {filter === "all" || filter === "songs" ? (
              <div className="songsBox">
                <h2>Songs</h2>
                <div className="songListContainer">
                  {searchedSongs !== 0 &&
                    searchedSongs.map((song) => {
                      return (
                        <div key={song.id} onClick={()=>handleSongClick(song.id)} className="searchsongContainer"  >
                        {/* // onClick={(song.id)=> {console.log("clicked");dispatch(pausingSongs());setTimeout(()=>{dispatch(playingSongs());dispatch(playSong())},1000);}} */}
                          <div className="songImgeAndDetails">
                            <div className="searchSongImage">
                              <img
                                src={
                                  song.album.images
                                    ? song.album.images[0].url
                                    : SearchSongImage
                                }
                                alt=""
                              />
                            </div>
                            <div className="searchSongDetails">
                              <h4>{song.name}</h4>
                              <p>
                                {song.artists
                                  ? song.artists[0].name
                                  : "Artist Name"}
                              </p>
                            </div>
                          </div>
                          <div className="searchTimeStampAndPlay">
                            <p>
                              {Math.floor(song.duration_ms / 1000 / 60) +
                                "." +
                                Math.floor((song.duration_ms / 1000) % 60)}
                            </p>
                            <AiFillCaretRight className="TimestampIcon" />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          <div>Sorry no Results to show</div>
        )
      ) : (
        <div className="unSearchedDiv">
          <img
          className="unSearchedDivimg"
            src={searchHome}
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default Search;
