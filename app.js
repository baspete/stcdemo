'use strict';
var express = require('express'),
    handlebars = require('express-handlebars'),
    bodyParser = require('body-parser'),
    app = express();

// Params sent from webhook
var lastEvent;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    layoutsDir: 'views',
    helpers: {}
}));
app.set('view engine', 'handlebars');

app.use('/api', (req, res) => {
  console.log('received', req.body);
  lastEvent = req.body;
  res.status(200).send(JSON.stringify(req.body));
});

app.get('/', (req,res) => {
  res.render('main', {
    helpers: {
      lastEvent: JSON.stringify(lastEvent)
    }
  });
});

// ========================================================================
// START THE SERVER
// Need to let CF set the port if we're deploying there.
var port = process.env.PORT || 9000;
app.listen(port);