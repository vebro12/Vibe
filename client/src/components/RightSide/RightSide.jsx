import React, { useState } from "react";
import "./RightSide.css";
import Home from "../../img/home2.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";

import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
import AddTrendForm from "../Trendcreate/Trendcreate";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const {user} = useSelector((state)=>state.authReducer.authData)
  return (
    <div className="RightSide">
      <div className="navIcons">
      <Link to = '../home'>
        <img style={{"cursor":"pointer" , height:26 ,paddingLeft:20 , width:30}} src={Home} alt="" />
        </Link>

        <Link to = {`/profile/${user._id}`}>
        <img style={{"cursor":"pointer" , height:25 ,paddingLeft:10 , width:25}} src={Noti} alt="" />
        </Link>
        <Link to = '../chat'>
        <img style={{"cursor":"pointer" , height:25 ,paddingRight:10 , width:25}} src={Comment} alt="" />
        </Link>
      </div>

      <TrendCard />
    <AddTrendForm/>
     
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
