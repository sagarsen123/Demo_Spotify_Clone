import "./Profile.css";
import { FiExternalLink } from "react-icons/fi";
import userDp from "../../images/UserDp.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { stopSong, pausingSongs } from "../../actions/index";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const myState = useSelector((state) => {
    return state.loginAndLogout;
  });
  const [userProfile, SetUserProfile] = useState();
  const [Loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      // console.log(myState);
      setLoader(true);
      try {
        let userDetails = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${myState.userToken}`,
          },
        });
        SetUserProfile(userDetails.data);
        setLoader(false);
      } catch (err) {
        // console.log(err);
      }
      // let userProfile = await userDetails.json();
      // console.log(userProfile);
    };
    fetchUserData();
  }, [myState.userToken]);

  const handleLogout = (e) =>{
    e.preventDefault();
    dispatch(pausingSongs());
    dispatch(stopSong())
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('playlistAndSongs');
      navigate('/');
   
  }
  return Loader && !userProfile ? (
    <p>Loading...</p>
  ) : (
    <div className="ProfileContainer">
      <h1>Profile</h1>
      <div className="profileBox">
        <div className="ProfileDp">
          <img
            src={userProfile.images ? userProfile.images[1].url : userDp}
            alt=""
          />
        </div>
        <div className="userDetails">
          <div className="userName">
            <h2>{userProfile.display_name}</h2>
            <p>{userProfile.email}</p>
          </div>
         
          <div className="btnEncloser">
            <button
              className="openSpotify"
              onClick={() => {
                window.open(userProfile.external_urls.spotify, "_blank");
              }}
            >
              <span>Open in Spotify</span>
              <FiExternalLink />
            </button>
            <button id="logoutBtn" className="openSpotify " onClick={handleLogout}>
              <span>Log Out</span>
              {/* <FiExternalLink /> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
