var express = require('express');
var router = express.Router();

var path = require('path');
var fs = require('fs');

//得到绝对路径
var dirTarget=path.resolve('./public/docs');

//读取dirTarget下的markdown文件，将文件名保存在数组下
function readMarkdownLst(dir){
  var markdownList=[];
  //同步读目录
  var files = fs.readdirSync(dir);
  files.forEach((item, index) => {
      var fullPath = path.join(dir, item);
      //同步得到其状态
      const stat = fs.statSync(fullPath);
      //若不是目录则加入数组
      if (!stat.isDirectory()) {      
        markdownList.push(item);   
      }  
    });
  return markdownList;
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{title:"data structure",
    subject:"数据结构",
    titleList:readMarkdownLst(dirTarget)});
});

module.exports = router;
