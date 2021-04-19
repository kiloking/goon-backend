// 
const express = require('express');
const router = express.Router();
const PostModel = require('../model/PostModel');

router.get('/', (req, res) => {
  PostModel.find().sort({_id: -1}).then(profile => {
    if (!profile) {
      return res.status(404).json('没有任何内容');
    }
    res.json(profile);
  })
  .catch(err => res.status(404).json(err));
});

// POST api/posts/
router.post('/', (req, res) => {
  // res.json({ msg: 'profile Post' });
  // PostModel.create(req.body).then(function(post){
  //   res.send(post)
  // })
  const postFields = {};
  if (req.body.title) postFields.title = req.body.title;
  if (req.body.category) postFields.category = req.body.category;
  if (req.body.author) postFields.author = req.body.author;
  if (req.body.host) postFields.host = req.body.host;
  if (req.body.partner) postFields.partner = req.body.partner;
  if (req.body.comment_count) postFields.comment_count = req.body.comment_count;
  if (req.body.upvote) postFields.upvote = req.body.upvote;

  new PostModel(postFields).save().then(post => {
    res.json(post);
  });

});


// get apo/post/:id 拿到單個
router.get(
  '/:id',(req, res) => {
    PostModel.findOne({ _id: req.params.id })
      .then(profile => {
        if (!profile) {
          return res.status(404).json('没有任何内容');
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// put api/posts/id
router.put('/:id', (req, res) => {
  // res.json({ msg: 'post put' });
  const postFields = {};
  if (req.body.title) postFields.title = req.body.title;
  if (req.body.category) postFields.category = req.body.category;
  if (req.body.author) postFields.author = req.body.author;
  if (req.body.host) postFields.host = req.body.host;
  if (req.body.partner) postFields.partner = req.body.partner;
  if (req.body.upvote) postFields.upvote = req.body.upvote;

  PostModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: postFields },
    { new: true }
  ).then(profile => res.json(profile));

});

// delete api/posts/id
router.delete('/:id', (req, res) => {
  PostModel.findOneAndDelete({ _id: req.params.id })
    .then(profile => {
      profile.save().then(profile => res.json({message: "deleted successfully!"}));
    })
    .catch(err => res.status(404).json('删除失败!'));
});

//把誰先去歷史暫存區
router.put('/drafts/:id', (req, res) => {
  // res.json({ msg: 'post put' });
  const postFields = {};
  if (req.body.title) postFields.title = req.body.title;
  if (req.body.content) postFields.content = req.body.content;
  if (req.body.category) postFields.category = req.body.category;
  if (req.body.author) postFields.author = req.body.author;
  if (req.body.views) postFields.views = req.body.views;
  if (req.body.upvote) postFields.upvote = req.body.upvote;

  PostModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: postFields },
    { new: true }
  ).then(profile => res.json(profile));

});


// 推文 comments 
router.put('/:id/comments' , (req,res) =>{
  const commentFields = {};
  if (req.body.push_content) commentFields.push_content = req.body.push_content;

  PostModel.findOneAndUpdate(
    { _id: req.params.id },
    { $push: {comments: commentFields} },
    { new: true }
  ).then(profile => res.json(profile));
})

module.exports = router;