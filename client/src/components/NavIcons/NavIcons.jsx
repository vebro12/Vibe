import React from "react";

import Home from "../../img/home2.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { Link } from "react-router-dom";

const NavIcons = () => {
  return (
    <div className="navIcons">
      <Link to = '../home'>
        <img style={{"cursor":"pointer" , height:26 ,paddingLeft:20 , width:30}} src={Home} alt="" />
        </Link>

        <Link to = '../profile/:id'>
        <img style={{"cursor":"pointer" , height:25 ,paddingLeft:10 , width:25}} src={Noti} alt="" />
        </Link>
        <Link to = '../chat'>
        <img style={{"cursor":"pointer" , height:25 ,paddingRight:10 , width:25}} src={Comment} alt="" />
        </Link>
    </div>
  );
};

export default NavIcons;