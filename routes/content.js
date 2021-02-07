var express = require('express');
var router = express.Router();
var marked = require("marked");

var path = require('path');
var fs = require('fs');

//得到绝对路径
var dirTarget=path.resolve('./public/docs');

//读取dirTarget下的markdown文件内容
function readMarkdown(dir,articleName,encode){
  var articleContent;
  //同步读目录
  var dir=dir+"/"+articleName;
  articleContent=fs.readFileSync(dir,encode);

  return articleContent;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  //得到前端发来的选中文章名
  var article=req.query.article;
  var articleContent=readMarkdown(dirTarget,article,"utf-8");

  //主题（大标题）
  var subject=article.split(".md");

  //渲染jade视图文件，传入相应参数 
  res.render('content', { title:"正在浏览"+subject[0],
    subject:subject[0],
    note:articleContent, 
    marked: marked });
});

module.exports = router;
