const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} , ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintain.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) =>{
  res.render('home.hbs', {
    pageTitle : 'HOME PAGE',
    welcomeMessage : 'Welcome to the Website'
  });
});

app.get('/bad', (req, res) =>{
  res.send({
      Respond : 'Error',
      code : 404,
      type : 'Network'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle : 'ABOUT PAGE',
  });
});

app.listen(port, () => {
  console.log(`Server is running of port ${port}`);
});
