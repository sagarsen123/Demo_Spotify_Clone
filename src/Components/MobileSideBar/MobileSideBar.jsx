import React from 'react'
import './MobileSideBar.css'

import SideBarLogo from "../../images/SideBarLogo.png";
import { AiFillHome } from "react-icons/ai";
import { BiUserCircle, BiSolidPlaylist } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { Link,useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { Link ,Navigate,useLocation } from "react-router-dom";

import {stopSong,pausingSongs} from '../../actions/index'
import { useDispatch } from "react-redux";

const MobileSideBar = () => {




  return (
    <div className='MobileSideBarWapper'>
      <ul className='navLinks'>
        <Link className='Links' to="/main/"><AiFillHome/><span>Home</span></Link>
        <Link className='Links' to="/main/Search/"><BsSearch/><span>Search</span></Link>
        <Link className='Links' to="/main/Profile/"><BiUserCircle/><span>Profile</span></Link>
        <Link className='Links' to="/main/Featured-Playlist"><BiSolidPlaylist/><span>Playlists</span></Link>
      </ul>
    </div>
  )
}

export default MobileSideBar


