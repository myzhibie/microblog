var express = require('express');
var router = express.Router();
var Post=require('../models/post');

/* GET users listing. */
router.get('/:uid', function(req, res, next) {
  if(req.session.user.name!=req.params.uid)  {
      req.session.message="用户不存在";
      return res.redirect('/');
  }
  Post.find({user:req.params.uid},function(err,posts){
      if(err){
          req.session.message=err.message;
          return res.redirect('/');
      }
      res.render('user',{
          title:"发表文章",
          username:req.params.uid,
          posts:posts
      });
  });

});
module.exports = router;
