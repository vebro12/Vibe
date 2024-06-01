import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { followUser, unfollowUser } from '../../actions/userAction';
import { io } from 'socket.io-client'




const User = ({person , addToChat }) => {

  const dispatch  = useDispatch();
  const {user} = useSelector((state)=>state.authReducer.authData)
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );


  const serverPublic = 'http://localhost:5000/images/'
  const socket = io('http://localhost:8800')
  const handleFollow = () => {
    following
     ? dispatch(unfollowUser(person._id, user))
     : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
    socket.emit('new-user-add', person._id) 
  };

const handleUserClick = () => {
    addToChat(person); 
  };

  return (
    <div className="follower">
    <div onClick={handleUserClick} style={{ cursor: "pointer" }}>
        <img src={person.profilePicture ? serverPublic + person.profilePicture : serverPublic + "img3.png"} alt="" className='followerImage' />
        <div className="name">
            <span onClick={handleUserClick}>{person.firstname}</span>
            <span onClick={handleUserClick}>@{person.username}</span>
        </div>
    </div>
    <button  className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}>
        {following ? "Unfollow":"Follow"}
    </button>
</div>
  )
}

export default User