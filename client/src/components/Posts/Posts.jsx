import React, { useEffect } from 'react'
import './Posts.css'
import Post from '../Post/Post'
import {useDispatch , useSelector} from 'react-redux'
import { getTimelinePosts } from '../../actions/postAction'
import {useParams} from  "react-router-dom"
const Posts = () => {

  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.authReducer.authData)
  const params = useParams();
  let {posts , loading} = useSelector((state)=>state.postReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);

if(!posts) return 'No Posts';
if(params.id){ 
  posts = posts.filter((post) => post.userId === params.id)
}
return (
  <div className="Posts">
      {loading
        ? "Fetching posts...."
        : posts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
    </div>
);
};

export default Posts