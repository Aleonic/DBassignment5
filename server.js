const express = require('express');
const app = express();

app.use(express.static('client'));

const object1 = {
  a: 'somestring',
  b: 42,
  c: false
};

app.get('/users', (req, res) => {
  console.log(object1.a);
  res.send("test");
});

app.listen(8080, () => {
  console.log('Server started');
});
