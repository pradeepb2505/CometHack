var express = require('express'),
    path = require('path'),
    jade = require('jade'),
    potholes = require('./routes/potholes');

var app = new express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/potholes', potholes);

app.get('/',function(req,res){
  res.render('layout', { title: 'Node.js / Google Maps Example', subtitle: 'with the help of the Express, Path, and Jade modules' });
});

app.listen(3000)
