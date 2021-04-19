const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let PostSchema = new Schema({
    title: String,
    category:String,
    author: String,
    host: String,
    partner:String,
    comment_count:{
      type:Number,
      default:0
    },
    upvote:{
      type:Number,
      default:0
    },
    actived:{
      type:Number,
      default:1
    },
    date: {
      type: Date,
      default: Date.now
    },
    comments: [
      {
        push_content: String,
        date:{
          type: Date,
          default: Date.now
        }
      }
    ]

})

module.exports = PostModel = mongoose.model('Post', PostSchema);