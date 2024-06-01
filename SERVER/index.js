import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors  from "cors";
import authrouter from './Routes/AuthRoute.js';
import userrouter from  './Routes/UserRoute.js';
import postrouter from './Routes/PostRoute.js';
import uploadrouter from './Routes/UploadRoute.js';
import chatrouter from './Routes/ChatRoute.js'
import messagerouter from './Routes/MessageRoute.js'
import commentrouter from './Routes/CommentRoute.js'
import trendsrouter from './Routes/TrendsRoute.js'
import User from './Models/userModel.js'



const app = express();
// serve images for public

app.use(express.static('public')); 
app.use('/images', express.static('images'));


// Middleware
app.use(bodyParser.json({ limit: '300mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '300mb', extended: true }));
app.use(cors());
dotenv.config();

// Database Connection
mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is listening on port 5000");
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

  // route 
app.get('/search/:user', async (req, res) => {
    try {
        const searchTerm = req.params.user;

        let users = await User.find({ username: { $regex: `^${searchTerm}$`, $options: 'i' } });
        
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while searching for the user.');
    }
});



app.use('/auth', authrouter)
app.use('/user', userrouter)
app.use('/post', postrouter)

app.use('/upload',uploadrouter)
app.use('/chat',chatrouter)
app.use('/message',messagerouter)
app.use('/comment',commentrouter)
app.use('/trends',trendsrouter)

