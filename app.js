const { response } = require('express');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
   .getBeers()
   .then(beers =>{
    console.log("Beers list is ready");
    console.log(beers)
    res.render("beers", { beers } );
   })
    .catch(err => {
      console.log("Error ", err);
    });
});

app.get("/random-beer", (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      console.log(randomBeer)
      res.render("randomBeer", { randomBeer })
    })
    .catch(err => {
      console.log("Error ", err)
    })
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
