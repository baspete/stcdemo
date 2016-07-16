'use strict';
var express = require('express'),
    handlebars = require('express-handlebars'),
    bodyParser = require('body-parser'),
    app = express();

var accel = {x:0,y:0,z:0};
var dial = {v:0};

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    layoutsDir: 'views',
    helpers: {}
}));
app.set('view engine', 'handlebars');

app.use('/api/dial', (req, res) => {
  console.log('dial received', req.body);
  dial = req.body;
  res.status(200).send(JSON.stringify(req.body));
});

app.use('/api/accel', (req, res) => {
  console.log('accel received', req.body);
  accel = req.body;
  res.status(200).send(JSON.stringify(req.body));
});

app.get('/', (req,res) => {
  res.render('main', {
    helpers: {
      accel: JSON.stringify(accel),
      dial: JSON.stringify(dial)
    }
  });
});

// ========================================================================
// START THE SERVER
// Need to let CF set the port if we're deploying there.
var port = process.env.PORT || 9000;
app.listen(port);