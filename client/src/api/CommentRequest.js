import axios from 'axios';

const API = axios.create({baseURL : "http://localhost:5000"});

export const addComment = (data) =>API.post(`/comment/`,data)

export const getComments = (postId)=> API.get(`/comment/${postId}`)

