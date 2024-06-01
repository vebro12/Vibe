import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import postReducer from "./postReducer.js";
import commentReducer from "./commentReducer.js";
import trendsReducer from './trendReducer.js';

export const reducers = combineReducers({authReducer, postReducer, comments : commentReducer , trends:trendsReducer });