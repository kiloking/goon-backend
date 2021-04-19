//TODO: 文章編輯類似markdown / medium
var app = require('express')();
var cors = require('cors')
var express = require('express');
var path = require('path');
var http = require('http').createServer(app);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// DB config
const db = require('./config/keys').mongoURI;

// 使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 導入mongoose 連接資料庫 建立Schema 連接model
// Connect to mongodb
mongoose
  .connect(
    db,
    { useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// 引入api
const posts = require('./api/posts')

// 使用route
app.use(cors())
app.use('/api/posts', posts);
app.use(express.static(path.join(__dirname, 'public')));

const Port = process.env.PORT || 3001;
http.listen(Port, function(){
  console.log(`listening on :${Port}`);
});



