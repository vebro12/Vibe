import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import {useDispatch, useSelector} from 'react-redux';
import { uploadImage } from "../../actions/uploadAction";
import {uploadPost} from  "../../actions/uploadAction.js"



const PostShare = () => {
  const serverPublic = 'http://localhost:5000/images/'
  const loading = useSelector((state)=> state.postReducer.uploading)
  const [image, setImage] = useState(null);
  const [mediaType, setMediaType] = useState(""); 
  const imageRef = useRef();
  const dispatch = useDispatch();
  const desc = useRef();
  const now = Date.now();
  const date = new Date(now);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();
  
 
  const formattedDate = ` ${day}/${month}/${year}`;
  const{user} = useSelector((state)=>state.authReducer.authData)

  // const onImageChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     let img = event.target.files[0];
  //     setImage(img);
  //   }
  // };
  const onMediaChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      setImage(file);
      const type = file.type.split('/')[0]; 
      setMediaType(type);
    }
  };

const handleUpload = async (e) => {
  e.preventDefault();

  if (!image) { 
    alert("Please select an image to share.");
    return;
  }

  //post data
  const newPost = {
    userId: user._id,
    desc: desc.current.value,
  };

  if (image) {
    const data = new FormData();
    const fileName = Date.now() + image.name;
    data.append("name", fileName);
    data.append("file", image);
    newPost.image = fileName;
    console.log(newPost);
    try {
      dispatch(uploadImage(data));
    } catch (err) {
      console.log(err);
    }
  }
  dispatch(uploadPost(newPost));
  resetShare();
};

const resetShare = () => {
  setImage(null);
  desc.current.value = "";
};

  return (
    <div className="PostShare">
      <img src={user.coverPicture ? serverPublic + user.profilePicture : serverPublic + "img3.png"} alt="Profile" />
      <div>
        <input 
        ref = {desc}
        required
        type="text" placeholder=" Vibe your captions ..." />
        <div className="postOptions">
        <div className="option" style={{ color: "var(--photo)" }}
          onClick={()=>imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)"  }} onClick={()=>imageRef.current.click()} >
        
          <UilPlayCircle /> Video
          </div>{" "}
          <div className="option" style={{ color: "var(--location)", display: "flex", alignItems: "center" }}>
   
       
        
        <a href={`https://www.google.com/maps/place/${user.livesin}`} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "inherit", display: "flex", alignItems: "center" }}>
        <UilLocationPoint />
        {user.livesin ? user.livesin : "Location"}
        
        </a>
</div>{" "}


          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            {formattedDate}
          </div>

          <button className="button ps-button"
          onClick={handleUpload}
          disabled={loading}
          >{loading? "Uploading...":"Share"}</button>
          <div style={{ display: "none" }}>
          <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onMediaChange}
              accept="image/*,video/*" 
            />
          </div>
        </div>
        {image && mediaType === "image" && (

        <div className="previewImage">
          <UilTimes onClick={()=>setImage(null)}/>
          <img src={ URL.createObjectURL(image)} alt="preview" />
        </div>

      )}
      {image && mediaType === "video" && (
        <div className="previewImage">
          <UilTimes onClick={()=>setImage(null)}/>
          <video controls src={URL.createObjectURL(image)} alt="preview"></video>
        </div>
      )}
      </div>
    </div>
  );
};

export default PostShare;
