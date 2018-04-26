var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var cors = require('cors');
var app = express();

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!",

}));
app.use(cors());
app.get('/', function(req, res){
   if(req.session.page_views){
      req.session.page_views++;
      res.json("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
      res.json("Welcome to this page for the first time!");
   }
});
app.listen(4000);