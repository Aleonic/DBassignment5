const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('flowers.db');

app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/flowers', (req, res) => {
  db.all('SELECT COMNAME FROM FLOWERS', (err, rows) => {
    res.send(rows);
  });
});

app.get('/flowerSightings/:nameValue', (req, res) => {
  const nameSearch = req.param.nameValue;
  db.all('SELECT * FROM Sightings WHERE name = $Name ORDER BY sighted LIMIT 10;',
  {
    $Name: nameSearch
  },
   (err, rows) => {
     console.log(rows);
      if (rows.length > 0) {
        res.send(rows[0]);
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
        res.send({message: 'error in app.post(/users)'});
      } else {
        res.send({message: 'successfully run app.post(/users)'});
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
        res.send({message: 'error in app.post(/users)'});
      } else {
        res.send({message: 'successfully run app.post(/users)'});
      }
    }
  );
});

app.listen(8080, () => {
  console.log('Server started');
});
