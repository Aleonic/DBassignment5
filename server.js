const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('flowers.db');

app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/flowers', (req, res) => {
  db.all('SELECT COMNAME, GENUS, SPECIES FROM FLOWERS', (err, rows) => {
    res.send(rows);
  });
});

app.get('/flowerSightings/:nameValue', (req, res) => {
  const nameSearch = req.params.nameValue;
  console.log('The name chosen was: ', nameSearch);
  db.all('SELECT PERSON, LOCATION, SIGHTED FROM Sightings WHERE name = $Name ORDER BY sighted LIMIT 10;',
  {
    $Name: nameSearch
  },
   (err, rows) => {
     console.log(rows);
      if (rows.length > 0) {
        res.send(rows);
      } else {
        res.send({}); // failed, so return an empty object instead of undefined
      }
  });
});

app.post('/updateF', (req, res) => {
  console.log(req.body);
  db.run(
    'UPDATE Flowers SET genus = $Genus, species = $Species WHERE comname = $Comname;',
    {
      $Comname: req.body.Comname,
      $Species: req.body.Species,
      $Genus: req.body.Genus
    },
    // callback function to run when the query finishes:
    (err) => {
      if (err) {
        res.send({message: 'error in app.post(/updateF)'});
      } else {
        res.send({message: 'Successfully updated flowers if Comname exists.'});
      }
    }
  );
});

app.post('/sightings', (req, res) => {
  console.log(req.body);
  db.run(
    'INSERT INTO Sightings VALUES($Name, $Person, $Location, $Sighted);',
    {
      $Name: req.body.Name,
      $Person: req.body.Person,
      $Location: req.body.Location,
      $Sighted: req.body.Sighted
    },
    // callback function to run when the query finishes:
    (err) => {
      if (err) {
        res.send({message: 'error in app.post(/sightings)'});
      } else {
        res.send({message: 'Successfully inserted into sightings.'});
      }
    }
  );
});

app.listen(8080, () => {
  console.log('Server started');
});
