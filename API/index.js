const express = require("express");
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/User')
const Post = require('./models/Post')
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')

const salt = bcrypt.genSaltSync(10);
const secret = 'jhdgqeliudhoifwbqdfgiyw2383r2752';

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static((__dirname+
    '/uploads')))

mongoose.connect('mongodb://127.0.0.1:27017')
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userdoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)
        });
        res.json(userdoc)
    } catch (e) {
        res.status(400).json(e);
    }
    // res.json({requestData:{username,password}})
})
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userdoc = await User.findOne
    ({ username });
    const passok = bcrypt.compareSync(password, userdoc.password);
    if (passok) {
        //loggedIn
        jwt.sign({ username, id: userdoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userdoc._id,
                username
            })
        })
    } else {
        res.status(400).json('wrong credentials')
    }
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok'); 
})

app.post('/post', upload.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1]
    const newpath = path + '.' + ext;
    fs.renameSync(path, newpath)

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body;
        const userpost = await Post.create({
            title,
            summary,
            content,
            cover: newpath,
            author: info.id
        });
        res.json(userpost)
    })
})


app.put('/post',upload.single('file'), async (req,res)=>{
    let newpath=null;
    if(req.file){
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1]
    newpath = path + '.' + ext;
    fs.renameSync(path, newpath)
    }

    const {token}=req.cookies;
    jwt.verify(token,secret,{},async (err,info)=>{
        if(err) throw err;
        const {id,title,summary,content}=req.body;
        const postDoc = await Post.findById(id);
        const isAuthor=JSON.stringify(postDoc.author)===JSON.stringify(info.id)
    if(!isAuthor){
        return res.status(400).json('You are not the author of this post')
    }
    try {
        const postDoc = await Post.findById(id);
      
        if (postDoc) {
          postDoc.title = title;
          postDoc.summary = summary;
          postDoc.content = content;
          postDoc.cover = newpath ? newpath : postDoc.cover;
      
          // Save the updated post document
          await postDoc.save();
      
          res.json(postDoc); // Sending the updated post document as a response
        } else {
          res.status(404).json({ message: 'Post not found' });
          // Handle the case when the post is not found
        }
      } catch (error) {
        res.status(500).json({ message: 'Error updating the post' });
        console.error('Error occurred while updating the post:', error);
        // Handle the error case
      }
    });
})

app.get('/post', async (req, res) => {
    res.json(await Post.find()
    .populate('author',['username'])
    .sort({createdAt:-1})
    .limit(20)
    )
})

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postdoc = await Post.findById(id).populate('author',['username']);
    res.json(postdoc)
})

app.listen(4000);
//BQlol6Ybd2WhPD49
// Whn4Z6fe7skvmqBc